import { Button, Col, Form, Input, Modal, notification, Popconfirm, Row, Space, Table, Typography } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nationalitiesService from "../../../services/nationalities-service";
import { 
    createNationalityAsyncThunk, 
    getAllNationalitiesAsyncThunk, 
    softDeleteNationalityAsyncThunk,
    updateNationalityAsyncThunk
} from "../../../store/features/nationalities/nationalitiesSlice";
import Highlighter from "react-highlight-words";
import { maxLengthFieldErrorMessage, minLengthFieldErrorMessage, requiredFieldErrorMessage } from "../../../helpers/global-constants";

const AddNationalityModal = ({ open, onCancel, onFinish, onFinishFailed }) => {
    const [addNationalityForm] = Form.useForm();

    const addNationalityModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    return (
        <Modal
            title="Add Nationality"
            centered
            open={open}
            onOk={() => {
                addNationalityForm
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                        addNationalityForm.resetFields();
                    })
            }}
            onCancel={() => {
                addNationalityForm.resetFields();
                onCancel();
            }}
        >
            <Form
                {...addNationalityModalFormLayout}
                form={addNationalityForm}
                name="add-nationality-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name={['nationality', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('nationality', 'name')
                        },
                        {
                            min: 6,
                            message: requiredFieldErrorMessage('nationality', 'name')
                        },
                        {
                            max: 40,
                            message: maxLengthFieldErrorMessage('nationality', 'name')
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const EditableNationalityCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    nationality,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={['nationality', dataIndex]}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('nationality', dataIndex)
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('nationality', dataIndex, 6)
                        },
                        {
                            max: 40,
                            message: maxLengthFieldErrorMessage('nationality', dataIndex, 30)
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

export default function NationalitiesManagement() {
    const nationalitiesDataLoadingStatus = useSelector(state => state.nationalities.loadingStatus);
    const nationalitiesToManage = useSelector(state => state.nationalities.nationalitiesToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddNationalityModalOpened, setIsAddNationalityModalOpened] = useState(false);
    const [editNationalityForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [nationalitySearchText, setNationalitySearchText] = useState('');
    const [nationalitySearchedColumn, setNationalitySearchedColumn] = useState('');
    const nationalitySearchInput = useRef(null);
    const { confirm } = Modal;
    const [nationalityEditingKey, setNationalityEditingKey] = useState('');
    const editNationalityFormValues = Form.useWatch([], editNationalityForm);
    const [isEditNationalityFormSubmittable, setIsEditNationalityFormSubmittable] = useState(true);

    const openAddNationalityModal = () => {
        setIsAddNationalityModalOpened(true);
    }

    const handleCancelAddNationalityModal = () => {
        setIsAddNationalityModalOpened(false);
    }

    const onAddNationalityFormFinish = async (addNationalityFormValues) => {
        const { nationality } = addNationalityFormValues;

        if (await nationalitiesService.nationalityExistsAsync(nationality.name)) {
            openNationalitiesManagementNotificationWithIcon('warning', 'Oops', 'Such nationality already exists!');
            return;
        }

        dispatch(createNationalityAsyncThunk({
            nationalityToCreate: {
                createdBy: currentUser.username,
                ...nationality
            }
        }))
            .unwrap()
            .then((_) => {
                loadNationalitiesData();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onAddNationalityFormFinishedFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteNationality = async (nationalityToDelete) => {
        confirm({
            title: 'Warning',
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${nationalityToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteNationalityAsyncThunk({
                    nationalityToSoftDeleteId: nationalityToDelete.id,
                    softDeleteNationalityData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadNationalitiesData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            centered: true
        })
    }

    const openNationalitiesManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getNationalitiesColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                    ref={nationalitySearchInput}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(event) => setSelectedKeys(event.target.value) ? [event.target.value] : []}
                    onPressEnter={() => handleNationalitySearch(selectedKeys, confirm, dataIndex)} 
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleNationalitySearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleNationalitySearchReset(clearFilters)}
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
                            setNationalitySearchText(selectedKeys[0]);
                            setNationalitySearchedColumn(dataIndex);
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
                setTimeout(() => nationalitySearchInput.current?.select(), 100);
            }
        },
        render: (nationalityValue) =>
            nationalitySearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[nationalitySearchText]}
                    autoEscape
                    textToHighlight={nationalityValue ? nationalityValue.toString() : ''}
                />
            ) : (
                nationalityValue
            )
    })

    const handleNationalitySearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setNationalitySearchText(selectedKeys[0]);
        setNationalitySearchedColumn(dataIndex);
    }

    const handleNationalitySearchReset = (clearFilters) => {
        clearFilters();
        setNationalitySearchText('');
    }

    const isNationalityEdited = (nationality) => nationality.id === nationalityEditingKey;

    const editNationality = (nationality) => {
        editNationalityForm.setFieldValue({
            nationality: {
                name: nationality.name
            }
        });
        
        setNationalityEditingKey(nationality.id);
    }

    const onCancelNationalityEdit = () => {
        setNationalityEditingKey('');
    }

    const onConfirmNationalityEdit = async (confirmNationalityEditId) => {
        try {
            const { nationality } = editNationalityFormValues;
            const editableNationalities = [...nationalitiesToManage];
            const editedNationalityIndex = editableNationalities
                .findIndex((nationality) => nationality.id === confirmNationalityEditId);
            
            if (editedNationalityIndex > -1) {
                const nationalityToEdit = editableNationalities[editedNationalityIndex];
                dispatch(updateNationalityAsyncThunk({
                    nationalityToUpdateId: nationalityToEdit.id,
                    updateNationalityData: { modifiedBy: currentUser.username, ...nationality }
                }))
                    .unwrap()
                    .then((_) => {
                        editableNationalities.splice(editedNationalityIndex, 1, { ...nationalityToEdit, ...nationality });
                        loadNationalitiesData();
                        setNationalityEditingKey('');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                editableNationalities.push(editNationalityFormValues);
                setNationalityEditingKey('');
            }
        } catch (error) {
            console.log('Update failed:', error);
        }
    }

    const nationalitiesManagementTableColumns = [
        {
             title: 'Name',
             dataIndex: 'name',
             key: 'name',
             width: '50%',
             ...getNationalitiesColumnSearchProps('name'),
             sorter: (a, b) => a.name.localeCompare(b.name),
             sortDirections: ['ascend', 'descend'],
             defaultSortOrder: 'ascend',
             editable: true
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '50%',
            render: (_, nationality) => isNationalityEdited(nationality)
                ? (
                    <span>
                        <Popconfirm
                            title="Save edit of current nationality?"
                            onConfirm={() => onConfirmNationalityEdit(nationality.id)}
                        >
                            <Typography.Link
                                style={{
                                    marginRight: 8
                                }}
                                disabled={!isEditNationalityFormSubmittable}
                            >
                                Save
                            </Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Cancel edit?" onConfirm={onCancelNationalityEdit}>
                            <Typography.Link>Cancel</Typography.Link>    
                        </Popconfirm>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button disabled={nationalityEditingKey !== ''} onClick={() => editNationality(nationality)}>Edit</Button>
                        <Button type="primary" danger onClick={() => onDeleteNationality(nationality)}>Delete</Button>
                    </Space>
                )
        }
    ]

    const mergedNationalitiesManagementTableColumns = nationalitiesManagementTableColumns.map((nationalitiesManagementTableCol) => {
        if (!nationalitiesManagementTableCol.editable) {
            return nationalitiesManagementTableCol;
        }

        return {
            ...nationalitiesManagementTableCol,
            onCell: (nationality) => ({
                nationality,
                dataIndex: nationalitiesManagementTableCol.dataIndex,
                inputType: 'text',
                title: nationalitiesManagementTableCol.title,
                editing: isNationalityEdited(nationality)
            })
        }
    })

    const loadNationalitiesData = useCallback(() => {
        dispatch(getAllNationalitiesAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadNationalitiesData();
    }, [loadNationalitiesData]);

    useEffect(() => {
        editNationalityForm.validateFields()
            .then(
                () => {
                    setIsEditNationalityFormSubmittable(true);
                },
                () => {
                    setIsEditNationalityFormSubmittable(false);
                }
            )
    }, [editNationalityForm, editNationalityFormValues]);

    return (
        <div className="nationalities-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddNationalityModal}>
                        Add New Nationality
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Nationalities</Button>
                    <Button type="dashed">Import Nationalities</Button>
                </Col>
            </Row>
            <AddNationalityModal
                open={isAddNationalityModalOpened}
                onCancel={handleCancelAddNationalityModal}
                onFinish={onAddNationalityFormFinish}
                onFinishFailed={onAddNationalityFormFinishedFailed}
            />
            <Form form={editNationalityForm} component={false} autoComplete="off">
                <Table
                    rowKey={(nationality) => nationality.id}
                    components={{
                        body: {
                            cell: EditableNationalityCell
                        }
                    }}
                    columns={mergedNationalitiesManagementTableColumns}
                    dataSource={nationalitiesToManage}
                    loading={nationalitiesDataLoadingStatus === 'pending'}
                    rowClassName="nationalities-editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                        onChange: onCancelNationalityEdit
                    }}
                />
            </Form>
        </div>
    )
 }