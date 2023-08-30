import { Form, Input, Modal, Space, Button, notification, Popconfirm, Typography, Row, Col, Table } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mediaService from "../../../services/media-service";
import { 
    createMediumAsyncThunk, 
    getAllMediaAsyncThunk, 
    softDeleteMediumAsyncThunk, 
    updateMediumAsyncThunk 
} from "../../../store/features/media/mediaSlice";
import Highlighter from "react-highlight-words";
import { 
    maxLengthFieldErrorMessage, 
    minLengthFieldErrorMessage, 
    requiredFieldErrorMessage 
} from "../../../helpers/global-constants";

const AddMediumModal = ({ open, onCancel, onFinish, onFinishFailed }) => {
    const [addMediumForm] = Form.useForm();

    const addMediumModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    return (
        <Modal
            title="Add Medium"
            centered
            open={open}
            onOk={() => {
                addMediumForm
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                        addMediumForm.resetFields();
                    })  
            }}
            onCancel={() => {
                addMediumForm.resetFields();
                onCancel();
            }}
        >
            <Form
                {...addMediumModalFormLayout}
                form={addMediumForm}
                name="add-medium-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name={['medium', 'name']}
                    label="Name"
                    rules={[
                        { 
                            required: true,
                            message: requiredFieldErrorMessage('medium', 'name')
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('medium', 'name', 6)
                        },
                        {
                            max: 30,
                            message: maxLengthFieldErrorMessage('medium', 'name', 30)
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const EditableMediumCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    medium,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={['medium', dataIndex]}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        { 
                            required: true,
                            message: requiredFieldErrorMessage('medium', 'name')
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('medium', 'name', 6)
                        },
                        {
                            max: 30,
                            message: maxLengthFieldErrorMessage('medium', 'name', 30)
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

export default function MediaManagement() {
    const mediaDataLoadingStatus = useSelector(state => state.media.loadingStatus);
    const mediaToManage = useSelector(state => state.media.mediaToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddMediumModalOpened, setIsAddMediumModalOpened] = useState(false);
    const [editMediumForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [mediumSearchText, setMediumSearchText] = useState('');
    const [mediumSearchedColumn, setMediumSearchedColumn] = useState('');
    const mediumSearchInput = useRef(null);
    const { confirm } = Modal;
    const [mediumEditingKey, setMediumEditingKey] = useState('');
    const editMediumFormValues = Form.useWatch([], editMediumForm);
    const [isEditMediumFormSubmittable, setIsEditMediumFormSubmittable] = useState(true);
    
    const openAddMediumModal = () => {
        setIsAddMediumModalOpened(true);
    }

    const handleCancelAddMediumModal = () => {
        setIsAddMediumModalOpened(false);
    }

    const onAddMediumFormFinish = async (addMediumFormValues) => {
        const { medium } = addMediumFormValues;

        if (await mediaService.mediumExistsAsync(medium.name)) {
            openMediaManagementNotificationWithIcon('warning', 'Oops', 'Such medium already exists!');
            return;
        }

        dispatch(createMediumAsyncThunk({
            mediumToCreate: {
                createdBy: currentUser.username,
                ...medium
            }
        }))
            .unwrap()
            .then((_) => {
                loadMediaData();
                setIsAddMediumModalOpened(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onAddMediumFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteMedium = async (mediumToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${mediumToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteMediumAsyncThunk({
                    mediumToSoftDeleteId: mediumToDelete.id,
                    softDeleteMediumData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadMediaData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            centered: true
        })
    }

    const openMediaManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getMediaColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                  ref={mediumSearchInput}
                  placeholder={`Search by ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
                  onPressEnter={() => handleMediumSearch(selectedKeys, confirm, dataIndex)}
                  style={{
                    marginBottom: 8,
                    display: 'block'
                  }} 
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleMediumSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleMediumSearchReset(clearFilters)}
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
                            })
                            setMediumSearchText(selectedKeys[0]);
                            setMediumSearchedColumn(dataIndex);
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
                setTimeout(() => mediumSearchInput.current?.select(), 100);
            }
        },
        render: (mediumValue) =>
            mediumSearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }} 
                    searchWords={[mediumSearchText]}
                    autoEscape
                    textToHighlight={mediumValue ? mediumValue.toString() : ''}
                />
            ) : (
                mediumValue
            )
    })

    const handleMediumSearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setMediumSearchText(selectedKeys[0]);
        setMediumSearchedColumn(dataIndex);
    }

    const handleMediumSearchReset = (clearFilters) => {
        clearFilters();
        setMediumSearchText('');
    }

    const isMediumEdited = (medium) => medium.id === mediumEditingKey;

    const editMedium = (medium) => {
        editMediumForm.setFieldValue({
            medium: {
                name: medium.name
            }
        });

        setMediumEditingKey(medium.id);
    }

    const onCancelMediumEdit = () => {
        setMediumEditingKey('');
    }

    const onConfirmMediumEdit = async (confirmMediumEditId) => {
        try {
            const { medium } = editMediumFormValues;
            const editableMedia = [...mediaToManage];
            const editedMediumIndex = editableMedia.findIndex((medium) => medium.id === confirmMediumEditId);

            if (editedMediumIndex > -1) {
                const mediumToEdit = editableMedia[editedMediumIndex];
                dispatch(updateMediumAsyncThunk({
                    mediumToUpdateId: mediumToEdit.id,
                    updateMediumData: { modifiedBy: currentUser.username, ...medium }
                }))
                    .unwrap()
                    .then((_) => {
                        editableMedia.splice(editedMediumIndex, 1, { ...mediumToEdit, ...medium });
                        loadMediaData();
                        setMediumEditingKey('');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                editableMedia.push(editMediumFormValues);
                setMediumEditingKey('');
            }
        } catch (error) {
            console.log('Update failed: ', error);
        }
    }

    const mediaManagementTableColumns = [
        { 
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            ...getMediaColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend',
            editable: true
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '50%',
            render: (_, medium) => isMediumEdited(medium)
                ? (
                    <span>
                        <Popconfirm
                            title="Save edit of current medium?"
                            onConfirm={() => onConfirmMediumEdit(medium.id)}
                        >
                            <Typography.Link
                                style={{
                                    marginRight: 8
                                }}
                                disabled={!isEditMediumFormSubmittable}
                            >
                                Save
                            </Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Cancel edit?" onConfirm={onCancelMediumEdit}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button disabled={mediumEditingKey !== ''} onClick={() => editMedium(medium)}>Edit</Button>
                        <Button type="primary" danger onClick={() => onDeleteMedium(medium)}>Delete</Button>
                    </Space>
                )
        }
    ]

    const mergedMediaManagementTableColumns = mediaManagementTableColumns.map((mediumManagementTableCol) => {
        if (!mediumManagementTableCol.editable) {
            return mediumManagementTableCol;
        }

        return {
            ...mediumManagementTableCol,
            onCell: (medium) => ({
                medium,
                dataIndex: mediumManagementTableCol.dataIndex,
                inputType: 'text',
                title: mediumManagementTableCol.title,
                editing: isMediumEdited(medium)
            }) 
        }
    })

    const loadMediaData = useCallback(() => {
        dispatch(getAllMediaAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadMediaData();
    }, [loadMediaData]);

    useEffect(() => {
        editMediumForm.validateFields()
            .then(
                () => {
                    setIsEditMediumFormSubmittable(true)
                },
                () => {
                    setIsEditMediumFormSubmittable(false)
                }
            );
    }, [editMediumForm, editMediumFormValues]);

    return (
        <div className="media-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddMediumModal}>
                        Add New Medium
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Media</Button>
                    <Button type="dashed">Import Media</Button>
                </Col>
            </Row>
            <AddMediumModal
                open={isAddMediumModalOpened}
                onCancel={handleCancelAddMediumModal}
                onFinish={onAddMediumFormFinish}
                onFinishFailed={onAddMediumFormFinishFailed} 
            />
            <Form form={editMediumForm} component={false} autoComplete="off">
                <Table
                    rowKey={(medium) => medium.id}
                    components={{
                        body: {
                            cell: EditableMediumCell
                        }
                    }}
                    columns={mergedMediaManagementTableColumns}
                    dataSource={mediaToManage}
                    loading={mediaDataLoadingStatus === 'pending'}
                    rowClassName="medium-editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                        onChange: onCancelMediumEdit
                    }}
                />
            </Form>
        </div>
    )
 }