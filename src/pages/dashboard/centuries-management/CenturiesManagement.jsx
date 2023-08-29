import { Button, Col, Form, Input, Modal, notification, Popconfirm, Row, Space, Table, Typography } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import centuriesService from "../../../services/centuries-service";
import {
    createCenturyAsyncThunk,
    getAllCenturiesAsyncThunk,
    softDeleteCenturyAsyncThunk,
    updateCenturyAsyncThunk
} from "../../../store/features/centuries/centuriesSlice";
import Highlighter from "react-highlight-words";
import { 
    maxLengthFieldErrorMessage, 
    minLengthFieldErrorMessage, 
    requiredFieldErrorMessage 
} from "../../../helpers/global-constants";

const AddCenturyModal = ({ open, onCancel, onFinish, onFinishFailed }) => {
    const [addCenturyForm] = Form.useForm();

    const addCenturyModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    return (
        <Modal
            title="Add Century"
            centered
            open={open}
            onOk={() => {
                addCenturyForm
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                        addCenturyForm.resetFields()
                    })
            }}
            onCancel={() => {
                addCenturyForm.resetFields();
                onCancel();
            }}
        >
            <Form
                {...addCenturyModalFormLayout}
                form={addCenturyForm}
                name="add-century-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name={['century', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('century', 'name')
                        },
                        {
                            min: 10,
                            message: minLengthFieldErrorMessage('century', 'name', 10)
                        },
                        {
                            max: 28,
                            message: maxLengthFieldErrorMessage('century', 'name', 28)
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>    
    )
}

const EditableCenturyCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    century,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={['century', dataIndex]}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        { 
                            required: true,
                            message: requiredFieldErrorMessage('century', dataIndex)
                        },
                        {
                            min: 10,
                            message: minLengthFieldErrorMessage('century', dataIndex, 10)
                        },
                        {
                            max: 28,
                            message: maxLengthFieldErrorMessage('century', dataIndex, 28)
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

export default function CenturiesManagement() {
    const centuriesDataLoadingStatus = useSelector(state => state.centuries.loadingStatus);
    const centuriesToManage = useSelector(state => state.centuries.centuriesToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddCenturyModalOpened, setIsAddCenturyModalOpened] = useState(false);
    const [editCenturyForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [centurySearchText, setCenturySearchText] = useState('');
    const [centurySearchedColumn, setCenturySearchedColumn] = useState('');
    const centurySearchInput = useRef(null);
    const { confirm } = Modal;
    const [centuryEditingKey, setCenturyEditingKey] = useState('');
    const editCenturyFormValues = Form.useWatch([], editCenturyForm);
    const [isEditCenturyFormSubmittable, setIsEditCenturyFormSubmittable] = useState(false);

    const openAddCenturyModal = () => {
        setIsAddCenturyModalOpened(true);
    }

    const handleCancelAddCenturyModal = () => {
        setIsAddCenturyModalOpened(false);
    }

    const onAddCenturyFormFinish = async (addCenturyFormValues) => {
        const { century } = addCenturyFormValues;

        if (await centuriesService.centuryExistsAsync(century.name)) {
            openCenturiesManagementNotificationWithIcon('warning', 'Oops', 'Such century already exists!');
            return;
        }

        dispatch(createCenturyAsyncThunk({
            centuryToCreate: {
                createdBy: currentUser.username,
                ...century
            }
        }))
            .unwrap()
            .then((_) => {
                loadCenturiesData();
            })
            .catch((error) => {
                console.log(error);
            })

        setIsAddCenturyModalOpened(false);
    }

    const onAddCenturyFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteCentury = async (centuryToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${centuryToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteCenturyAsyncThunk({
                    centuryToSoftDeleteId: centuryToDelete.id,
                    softDeleteCenturyData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadCenturiesData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            centered: true
        })
    }

    const openCenturiesManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getCenturiesColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 0
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                    ref={centurySearchInput}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
                    onPressEnter={() => handleCenturySearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleCenturySearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleCenturySearchReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: true
                            });
                            setCenturySearchText(selectedKeys[0]);
                            setCenturySearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => centurySearchInput.current?.select(), 100);
            }
        },
        render: (centuryValue) =>
            centurySearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[centurySearchText]}
                    autoEscape
                    textToHighlight={centuryValue ? centuryValue.toString() : ''}
                />
            ) : (
                centuryValue
            )
    })

    const handleCenturySearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setCenturySearchText(selectedKeys[0]);
        setCenturySearchedColumn(dataIndex);
    }

    const handleCenturySearchReset = (clearFilters) => {
        clearFilters();
        setCenturySearchText('');
    }

    const isCenturyEdited = (century) => century.id === centuryEditingKey;

    const editCentury = (century) => {
        editCenturyForm.setFieldsValue({
            century: {
                name: century.name
            }
        });

        setCenturyEditingKey(century.id);
    }

    const onCancelCenturyEdit = () => {
        setCenturyEditingKey('');
    }

    const onConfirmCenturyEdit = async (confirmCenturyEditId) => {
        try {
            const { century } = editCenturyFormValues;
            const editableCenturies = [...centuriesToManage];
            const editedCenturyIndex = editableCenturies.findIndex((century) => century.id === confirmCenturyEditId);

            if (editedCenturyIndex > -1) {
                const centuryToEdit = editableCenturies[editedCenturyIndex];
                dispatch(updateCenturyAsyncThunk({
                    centuryToUpdateId: centuryToEdit.id,
                    updateCenturyData: { modifiedBy: currentUser.username, ...century }
                }))
                    .unwrap()
                    .then((_) => {
                        editableCenturies.splice(editedCenturyIndex, 1, { ...centuryToEdit, ...century });
                        loadCenturiesData();
                        setCenturyEditingKey('');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                editableCenturies.push(editCenturyFormValues);
                setCenturyEditingKey('');
            }
        } catch (error) {
            console.log('Update failed', error);
        }
    }

    const centuriesManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            ...getCenturiesColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend',
            editable: true
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '50%',
            render: (_, century) => isCenturyEdited(century)
                ? (
                    <span>
                        <Popconfirm
                            title="Save edit of current century?"
                            onConfirm={() => onConfirmCenturyEdit(century.id)}
                        >
                            <Typography.Link
                                style={{
                                    marginRight: 8
                                }}
                                disabled={!isEditCenturyFormSubmittable}
                            >
                                Save
                            </Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Cancel edit?" onConfirm={onCancelCenturyEdit}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button disabled={centuryEditingKey !== ''} onClick={() => editCentury(century)}>Edit</Button>
                        <Button type="primary" danger onClick={() => onDeleteCentury(century)}>Delete</Button>
                    </Space>
                )
        }
    ]

    const mergedCenturiesManagementTableColumns = centuriesManagementTableColumns.map((centuriesManagementTableCol) => {
        if (!centuriesManagementTableCol.editable) {
            return centuriesManagementTableCol;
        }

        return {
            ...centuriesManagementTableCol,
            onCell: (century) => ({
                century,
                dataIndex: centuriesManagementTableCol.dataIndex,
                inputType: 'text',
                title: centuriesManagementTableCol.title,
                editing: isCenturyEdited(century)
            })
        }
    })

    const loadCenturiesData = useCallback(() => {
        dispatch(getAllCenturiesAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadCenturiesData();
    }, [loadCenturiesData]);

    useEffect(() => {
        editCenturyForm.validateFields()
            .then(
                () => {
                    setIsEditCenturyFormSubmittable(true);
                },
                () => {
                    setIsEditCenturyFormSubmittable(false);
                }
            )
    }, [editCenturyForm, editCenturyFormValues]);

    return (
        <div className="centuries-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddCenturyModal}>
                        Add New Century
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Centuries</Button>
                    <Button type="dashed">Import Centuries</Button>
                </Col>
            </Row>
            <AddCenturyModal
                open={isAddCenturyModalOpened}
                onCancel={handleCancelAddCenturyModal}
                onFinish={onAddCenturyFormFinish}
                onFinishFailed={onAddCenturyFormFinishFailed} 
            />
            <Form form={editCenturyForm} component={false} autoComplete="off">
                <Table
                    rowKey={(century) => century.id}
                    components={{
                        body: {
                            cell: EditableCenturyCell
                        }
                    }}
                    columns={mergedCenturiesManagementTableColumns}
                    dataSource={centuriesToManage}
                    loading={centuriesDataLoadingStatus === 'pending'}
                    rowClassName="centuries-editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                        onChange: onCancelCenturyEdit
                    }}
                />
            </Form>
        </div>
    )
}