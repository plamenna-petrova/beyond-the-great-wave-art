import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Input, Space, Table, Row, Col, notification, Typography, Popconfirm } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
import stylesService from "../../../services/styles-service";
import { 
    createStyleAsyncThunk, 
    getAllStylesAsyncThunk, 
    softDeleteStyleAsyncThunk, 
    updateStyleAsyncThunk 
} from "../../../store/features/styles/stylesSlice";
import { useCallback } from "react";
import { useEffect } from "react";
import Highlighter from "react-highlight-words";
import { 
    maxLengthFieldErrorMessage, 
    minLengthFieldErrorMessage, 
    requiredFieldErrorMessage 
} from "../../../helpers/global-constants";

const AddStyleModal = ({ open, onCancel, onFinish, onFinishFailed }) => {
    const [addStyleForm] = Form.useForm();
    
    const addStyleModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    return (
        <Modal
            title="Add Style"
            centered
            open={open}
            onOk={() => {
                addStyleForm
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                        addStyleForm.resetFields();
                    })  
            }}
            onCancel={() => {
                addStyleForm.resetFields();
                onCancel();
            }}
        >
            <Form
                {...addStyleModalFormLayout}
                form={addStyleForm}
                name="add-style-form"
                onFinis={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name={['style', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('style', 'name')
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('style', 'name', 6)
                        },
                        {
                            max: 25,
                            message: maxLengthFieldErrorMessage('style', 'name', 25)
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const EditableStyleCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    style,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={['style', dataIndex]}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                           required: true,
                           message: requiredFieldErrorMessage('style', 'name')
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('style', 'name', 6)
                        },
                        {
                            max: 30,
                            message: maxLengthFieldErrorMessage('style', 'name', 30)
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

export default function StylesManagement() {
    const stylesDataLoadingStatus = useSelector(state => state.styles.loadingStatus);
    const stylesToManage = useSelector(state => state.styles.stylesToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddStyleModalOpened, setIsAddStyleModalOpened] = useState(false);
    const [editStyleForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [styleSearchText, setStyleSearchText] = useState('');
    const [styleSearchedColumn, setStyleSearchedColumn] = useState('');
    const styleSearchInput = useRef(null);
    const { confirm } = Modal;
    const [styleEditingKey, setStyleEditingKey] = useState('');
    const editStyleFormValues = Form.useWatch([], editStyleForm);
    const [isEditStyleFormSubmittable, setIsEditStyleFormSubmittable] = useState(true);

    const openAddStyleModal = () => {
        setIsAddStyleModalOpened(true);
    }
    
    const handleCancelAddStyleModal = () => {
        setIsAddStyleModalOpened(false);
    }

    const onAddStyleFormFinish = async (addStyleFormValues) => {
        const { style } = addStyleFormValues;

        if (await stylesService.styleExistsAsync(style.name)) {
            openStylesManagementNotificationWithIcon('warning', 'Oops', 'Such style already exists!');
            return;
        }

        dispatch(createStyleAsyncThunk({
            styleToCreate: {
                createdBy: currentUser.userna,
                ...style
            }
        }))
            .unwrap()
            .then((_) => {
                loadStylesData();
                setIsAddStyleModalOpened(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onAddStyleFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteStyle = async (styleToDelete) => {
        confirm({
            title: 'Warning',
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${styleToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteStyleAsyncThunk({
                    styleToSoftDeleteId: styleToDelete.id,
                    softDeleteStyleData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadStylesData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            centered: true
        })
    }

    const openStylesManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getStylesColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                    ref={styleSearchInput}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
                    onPressEnter={() => handleStyleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleStyleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleStyleSearchReset(clearFilters)}
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
                            setStyleSearchText(selectedKeys[0]);
                            setStyleSearchedColumn(dataIndex);
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
                setTimeout(() => styleSearchInput.current?.select(), 100);
            }
        },
        render: (styleValue) =>
            styleSearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[styleSearchText]}
                    autoEscape
                />
            ) : (
                styleValue
            )
    })

    const handleStyleSearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setStyleSearchText(selectedKeys[0]);
        setStyleSearchedColumn(dataIndex);
    }

    const handleStyleSearchReset = (clearFilters) => {
        clearFilters();
        setStyleSearchText('');
    }

    const isStyleEdited = (style) => style.id === styleEditingKey;

    const editStyle = (style) => {
        editStyleForm.setFieldsValue({
            style: {
                name: style.name
            }
        });

        setStyleEditingKey(style.id);
    }

    const onCancelStyleEdit = () => {
        setStyleEditingKey('');
    }

    const onConfirmStyleEdit = async (confirmStyleEditId) => {
        try {
            const { style } = editStyleFormValues;
            const editableStyles = [...stylesToManage];
            const editedStyleIndex = editableStyles.findIndex((style) => style.id === confirmStyleEditId);

            if (editedStyleIndex > -1) {
                const styleToEdit = editableStyles[editedStyleIndex];
                dispatch(updateStyleAsyncThunk({
                    styleToUpdateId: styleToEdit.id,
                    updateStyleData: { modifiedBy: currentUser.username, ...style }
                }))
                    .unwrap()
                    .then((_) => {
                        editableStyles.splice(editedStyleIndex, 1, { ...styleToEdit, ...style });
                        loadStylesData();
                        setStyleEditingKey('');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                editableStyles.push(editStyleFormValues);
                setStyleEditingKey('');
            }
        } catch (error) {
            console.log('Update failed', error);
        }
    }

    const stylesManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            ...getStylesColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            defaultSortOrder: 'ascend',
            editable: true
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '50%',
            render: (_, style) => isStyleEdited(style)
                ? (
                    <span>
                        <Popconfirm
                            title="Save edit of current style?"
                            onConfirm={() => onConfirmStyleEdit(style.id)}
                        >
                            <Typography.Link
                                style={{
                                    marginRight: 8
                                }}
                                disabled={!isEditStyleFormSubmittable}
                            >
                                Save
                            </Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Cancel edit?" onConfirm={onCancelStyleEdit}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button disabled={styleEditingKey !== ''} onClick={() => editStyle(style)}>Edit</Button>
                        <Button type="primary" danger onClick={() => onDeleteStyle(style)}>Delete</Button>
                    </Space>
                )
        }
    ]

    const mergedStylesManagementTableColumns = stylesManagementTableColumns.map((stylesManagementTableCol) => {
        if (!stylesManagementTableCol.editable) {
            return stylesManagementTableCol;
        }

        return {
            ...stylesManagementTableCol,
            onCell: (style) => ({
                style,
                dataIndex: stylesManagementTableCol.dataIndex,
                inputType: 'text',
                title: stylesManagementTableCol.title,
                editing: isStyleEdited(style)
            })
        }
    })
 
    const loadStylesData = useCallback(() => {
        dispatch(getAllStylesAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadStylesData();
    }, [loadStylesData]);

    useEffect(() => {
        editStyleForm.validateFields()
            .then(
                () => {
                    setIsEditStyleFormSubmittable(true);
                },
                () => {
                    setIsEditStyleFormSubmittable(false);
                }
            )
    }, [editStyleForm, editStyleFormValues]);

    return (
        <div className="styles-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddStyleModal}>
                        Add New Style
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Styles</Button>
                    <Button type="dashed">Import Styles</Button>
                </Col>
            </Row>
            <AddStyleModal
                open={isAddStyleModalOpened}
                onCancel={handleCancelAddStyleModal}
                onFinish={onAddStyleFormFinish}
                onFinishFailed={onAddStyleFormFinishFailed} 
            />
            <Form form={editStyleForm} component={false} autoComplete="off">
                <Table
                    rowKey={(style) => style.id}
                    components={{
                        body: {
                            cell: EditableStyleCell
                        }
                    }}
                    columns={mergedStylesManagementTableColumns}
                    dataSource={stylesToManage}
                    loading={stylesDataLoadingStatus === 'pending'}
                    rowClassName="style-editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                        onChange: onCancelStyleEdit
                    }}
                />
            </Form>
        </div>
    )
}