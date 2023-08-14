import { useState } from "react"
import { Button, Form, Modal, Input, Space, Table, Row, Col, notification } from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { createFieldAsync, deleteFieldAsync, fieldExistsAsync, getAllFieldsAsync, updateFieldAsync } from "../../../services/fields-service";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
import { useEffect } from "react";

export default function FieldsManagement() {
    const [fieldsToManage, setFieldsToManage] = useState([]);
    const [isFieldsDataLoading, setIsFieldsDataLoading] = useState(false);
    const [isAddOrEditFieldModalOpened, setIsAddOrEditFieldModalOpened] = useState(false);
    const [fieldToEditId, setFieldToEditId] = useState(null);
    const [addOrEditFieldForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [fieldSearchText, setFieldSearchText] = useState('');
    const [fieldSearchedColumn, setFieldSearchedColumn] = useState('');
    const fieldSearchInput = useRef(null);
    const { confirm } = Modal;

    const openAddOrEditFieldModal = (currentField) => {
        if (currentField) {
            addOrEditFieldForm.setFieldsValue({ field: currentField });
            setFieldToEditId(currentField.id);
        }

        setIsAddOrEditFieldModalOpened(true);
    }

    const handleCancelAddOrEditFieldModal = () => {
        addOrEditFieldForm.resetFields();
        setIsAddOrEditFieldModalOpened(false);

        if (fieldToEditId) {
            setFieldToEditId(null);
        }
    }

    const addOrEditFieldModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    const onAddOrEditFieldFormFinish = async (addOrEditFieldFormValues) => {
        const { field } = addOrEditFieldFormValues;

        if (!fieldToEditId) {
            if (await fieldExistsAsync(field.name)) {
                openFieldsManagementNotificationWithIcon('warning', 'Oops', 'Such field already exists!');
                return;
            }

            await createFieldAsync(field);
        } else {
            await updateFieldAsync(fieldToEditId, field);
            setFieldToEditId(null);
        }

        setIsAddOrEditFieldModalOpened(false);
        addOrEditFieldForm.resetFields();
        loadFieldsData();
    }

    const onAddOrEditFieldFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteField = async (fieldToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${fieldToDelete.name}?`,
            async onOk() {
                await deleteFieldAsync(fieldToDelete.id);
                loadFieldsData();
            },
            centered: true
        })
    }

    const openFieldsManagementNotificationWithIcon = (type, message, description, duration) => {
        api[type]({
            message,
            description,
            duration: duration ? duration : 0
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
        render: (fieldName) =>
            fieldSearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[fieldSearchText]}
                    autoEscape
                    textToHighlight={fieldName ? fieldName.toString() : ''}
                />
            ) : (
                fieldName
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

    const fieldsManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            ...getFieldsColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '50%',
            render: (_, field) => (
                <Space size="middle">
                    <Button onClick={() => openAddOrEditFieldModal(field)}>Edit</Button>
                    <Button type="primary" danger onClick={() => onDeleteField(field)}>Delete</Button>
                </Space>
            )
        }
    ];

    const loadFieldsData = async () => {
        setIsFieldsDataLoading(true);
        const allFieldsToLoad = await getAllFieldsAsync();
        setFieldsToManage(allFieldsToLoad);
        setTimeout(() => {
            setIsFieldsDataLoading(false);
        }, 400);
    }

    useEffect(() => {
        loadFieldsData();
    }, []);

    return (
        <div className="fields-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddOrEditFieldModal}>
                        Add New Field
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Fields</Button>
                    <Button type="dashed">Import Fields</Button>
                </Col> 
            </Row>
            <Modal
                title={!fieldToEditId ? 'Add Field' : 'Edit Field'}
                centered
                open={isAddOrEditFieldModalOpened}
                onOk={addOrEditFieldForm.submit}
                onCancel={handleCancelAddOrEditFieldModal}
            >
                <Form
                    {...addOrEditFieldModalFormLayout}
                    form={addOrEditFieldForm}
                    name="add-or-edit-field-form"
                    onFinish={onAddOrEditFieldFormFinish}
                    onFinishFailed={onAddOrEditFieldFormFinishFailed}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name={['field', 'name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'The field name is required'
                            },
                            {
                                min: 6,
                                message: 'The field name must be at least 6 characters long'
                            },
                            {
                                max: 30,
                                message: 'The field name cannot be longer than 30 characters'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                columns={fieldsManagementTableColumns}
                dataSource={fieldsToManage}
                loading={isFieldsDataLoading}
                pagination={{ 
                    defaultPageSize: 10, 
                    showSizeChanger: true, 
                    pageSizeOptions: ['10', '20', '30'] 
                }}
            />
        </div>
    )
}