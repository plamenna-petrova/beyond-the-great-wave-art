import { useState } from "react"
import { Button, Form, Modal, Input, Space, Table, Row, Col, notification, Typography, Popconfirm } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import fieldsService from "../../../services/fields-service";
import { useRef } from "react";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
    maxLengthFieldErrorMessage,
    minLengthFieldErrorMessage,
    requiredFieldErrorMessage
} from "../../../helpers/global-constants";
import './FieldsManagement.css';
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
    createFieldAsyncThunk,
    softDeleteFieldAsyncThunk,
    getAllFieldsAsyncThunk,
    updateFieldAsyncThunk
} from "../../../store/features/fields/fieldsSlice";

const AddFieldModal = ({ open, onCancel, onFinish, onFinishFailed }) => {
    const [addFieldForm] = Form.useForm();

    const addFieldModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    return (
        <Modal
            title="Add Field"
            centered
            open={open}
            onOk={() => {
                addFieldForm
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                        addFieldForm.resetFields();
                    });
            }}
            onCancel={() => {
                addFieldForm.resetFields();
                onCancel();
            }}
        >
            <Form
                {...addFieldModalFormLayout}
                form={addFieldForm}
                name="add-field-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name={['field', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('field', 'name')
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('field', 'name', 6)
                        },
                        {
                            max: 30,
                            message: maxLengthFieldErrorMessage('field', 'name', 30)
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const EditableFieldCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    field,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={['field', dataIndex]}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('field', dataIndex)
                        },
                        {
                            min: 6,
                            message: minLengthFieldErrorMessage('field', dataIndex, 6)
                        },
                        {
                            max: 30,
                            message: maxLengthFieldErrorMessage('field', dataIndex, 30)
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

export default function FieldsManagement() {
    const fieldsDataLoadingStatus = useSelector(state => state.fields.loadingStatus);
    const fieldsToManage = useSelector(state => state.fields.fieldsToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddFieldModalOpened, setIsAddFieldModalOpened] = useState(false);
    const [editFieldForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [fieldSearchText, setFieldSearchText] = useState('');
    const [fieldSearchedColumn, setFieldSearchedColumn] = useState('');
    const fieldSearchInput = useRef(null);
    const { confirm } = Modal;
    const [fieldEditingKey, setFieldEditingKey] = useState('');
    const editFieldFormValues = Form.useWatch([], editFieldForm);
    const [isEditFieldFormSubmittable, setIsEditFieldFormSubmittable] = useState(true);

    const openAddFieldModal = () => {
        setIsAddFieldModalOpened(true);
    }

    const handleCancelAddFieldModal = () => {
        setIsAddFieldModalOpened(false);
    }

    const onAddFieldFormFinish = async (addFieldFormValues) => {
        const { field } = addFieldFormValues;

        if (await fieldsService.fieldExistsAsync(field.name)) {
            openFieldsManagementNotificationWithIcon('warning', 'Oops', 'Such field already exists!');
            return;
        }

        dispatch(createFieldAsyncThunk({
            fieldToCreate: {
                createdBy: currentUser.username,
                ...field
            }
        }))
            .unwrap()
            .then((_) => {
                loadFieldsData();
            })
            .catch((error) => {
                console.log(error);
            });

        setIsAddFieldModalOpened(false);
    }

    const onAddFieldFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteField = async (fieldToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${fieldToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteFieldAsyncThunk({
                    fieldToSoftDeleteId: fieldToDelete.id,
                    softDeleteFieldData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadFieldsData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            centered: true
        })
    }

    const openFieldsManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getFieldsColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                    ref={fieldSearchInput}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
                    onPressEnter={() => handleFieldSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleFieldSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleFieldSearchReset(clearFilters)}
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
                            setFieldSearchText(selectedKeys[0]);
                            setFieldSearchedColumn(dataIndex);
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
                setTimeout(() => fieldSearchInput.current?.select(), 100);
            }
        },
        render: (fieldValue) =>
            fieldSearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[fieldSearchText]}
                    autoEscape
                    textToHighlight={fieldValue ? fieldValue.toString() : ''}
                />
            ) : (
                fieldValue
            )
    })

    const handleFieldSearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setFieldSearchText(selectedKeys[0]);
        setFieldSearchedColumn(dataIndex);
    }

    const handleFieldSearchReset = (clearFilters) => {
        clearFilters();
        setFieldSearchText('');
    }

    const isFieldEdited = (field) => field.id === fieldEditingKey;

    const editField = (field) => {
        editFieldForm.setFieldsValue({
            field: {
                name: field.name
            }
        });

        setFieldEditingKey(field.id);
    }

    const onCancelFieldEdit = () => {
        setFieldEditingKey('');
    }

    const onConfirmFieldEdit = async (confirmFieldEditId) => {
        try {
            const { field } = editFieldFormValues;
            const editableFields = [...fieldsToManage];
            const editedFieldIndex = editableFields.findIndex((field) => field.id === confirmFieldEditId);

            if (editedFieldIndex > -1) {
                const fieldToEdit = editableFields[editedFieldIndex];
                dispatch(updateFieldAsyncThunk({
                    fieldToUpdateId: fieldToEdit.id,
                    updateFieldData: { modifiedBy: currentUser.username, ...field }
                }))
                    .unwrap()
                    .then((_) => {
                        editableFields.splice(editedFieldIndex, 1, { ...fieldToEdit, ...field });
                        loadFieldsData();
                        setFieldEditingKey('');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                editableFields.push(editFieldFormValues);
                setFieldEditingKey('');
            }
        } catch (error) {
            console.log('Update failed:', error);
        }
    }

    const fieldsManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            ...getFieldsColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend',
            editable: true
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '50%',
            render: (_, field) => isFieldEdited(field)
                ? (
                    <span>
                        <Popconfirm
                            title="Save edit of current field?"
                            onConfirm={() => onConfirmFieldEdit(field.id)}
                        >
                            <Typography.Link
                                style={{
                                    marginRight: 8
                                }}
                                disabled={!isEditFieldFormSubmittable}
                            >
                                Save
                            </Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Cancel edit?" onConfirm={onCancelFieldEdit}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button disabled={fieldEditingKey !== ''} onClick={() => editField(field)}>Edit</Button>
                        <Button type="primary" danger onClick={() => onDeleteField(field)}>Delete</Button>
                    </Space>
                )
        }
    ]

    const mergedFieldsManagementTableColumns = fieldsManagementTableColumns.map((fieldsManagementTableCol) => {
        if (!fieldsManagementTableCol.editable) {
            return fieldsManagementTableCol;
        }

        return {
            ...fieldsManagementTableCol,
            onCell: (field) => ({
                field,
                dataIndex: fieldsManagementTableCol.dataIndex,
                inputType: 'text',
                title: fieldsManagementTableCol.title,
                editing: isFieldEdited(field)
            })
        }
    });

    const loadFieldsData = useCallback(() => {
        dispatch(getAllFieldsAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadFieldsData();
    }, [loadFieldsData]);

    useEffect(() => {
        editFieldForm.validateFields()
            .then(
                () => {
                    setIsEditFieldFormSubmittable(true);
                },
                () => {
                    setIsEditFieldFormSubmittable(false);
                }
            );
    }, [editFieldForm, editFieldFormValues]);

    return (
        <div className="fields-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddFieldModal}>
                        Add New Field
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Fields</Button>
                    <Button type="dashed">Import Fields</Button>
                </Col>
            </Row>
            <AddFieldModal
                open={isAddFieldModalOpened}
                onCancel={handleCancelAddFieldModal}
                onFinish={onAddFieldFormFinish}
                onFinishFailed={onAddFieldFormFinishFailed}
            />
            <Form form={editFieldForm} component={false} autoComplete="off">
                <Table
                    rowKey={(field) => field.id}
                    components={{
                        body: {
                            cell: EditableFieldCell
                        }
                    }}
                    columns={mergedFieldsManagementTableColumns}
                    dataSource={fieldsToManage}
                    loading={fieldsDataLoadingStatus === 'pending'}
                    rowClassName="field-editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                        onChange: onCancelFieldEdit
                    }}
                />
            </Form>
        </div>
    )
}