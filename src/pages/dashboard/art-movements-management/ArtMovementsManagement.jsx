import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Space, Table } from "antd";
import { useState, useRef } from "react"
import { artMovementExistsAsync, createArtMovementAsync, updateArtMovementAsync, getAllArtMovementsAsync, deleteArtMovementAsync } from "../../../services/art-movements-service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { maxLengthFieldErrorMessage, minLengthFieldErrorMessage, requiredFieldErrorMessage } from "../../../helpers/global-constants";
import { useSelector } from "react-redux/es/exports";
import TextArea from "antd/es/input/TextArea";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const artMovementPeriods = [
    'Ancient Egyptian Art',
    'Ancient Greek Art',
    'Western Medieval Art',
    'Western Renaissance Art',
    'Western Post Renaissance Art',
    'Modern Art',
    'Contemporary Art',
    'Chinese Art',
    'Korean Art',
    'Japanese Art',
    'Islamic Art',
    'Native Art',
    'Pre-Columbian Art'
]

export default function ArtMovementsManagement() {
    const [artMovementsToManage, setArtMovementsToManage] = useState([]);
    const [isArtMovementsDataLoading, setIsArtMovementsDataLoading] = useState(false);
    const [isAddOrEditArtMovementModalOpened, setIsAddOrEditArtMovementModalOpened] = useState(false);
    const [artMovementToEditId, setArtMovementToEditId] = useState(null);
    const [addOrEditArtMovementForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [artMovementSearchText, setArtMovementSearchText] = useState('');
    const [artMovementSearchedColumn, setArtMovementSearchedColumn] = useState('');
    const artMovementSearchInput = useRef(null);
    const { confirm, info } = Modal;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const currentUser = useSelector((state) => state.auth.currentUser);

    const openAddOrEditArtMovementModal = (currentArtMovement) => {
        if (currentArtMovement) {
            addOrEditArtMovementForm.setFieldsValue({ artMovement: currentArtMovement });
            setArtMovementToEditId(currentArtMovement.id);
        }

        setIsAddOrEditArtMovementModalOpened(true);
    }

    const handleCancelAddOrEditArtMovementModal = () => {
        addOrEditArtMovementForm.resetFields();
        setIsAddOrEditArtMovementModalOpened(false);

        if (artMovementToEditId) {
            setArtMovementToEditId(null);
        }
    }

    const addOrEditArtMovementFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    const onAddOrEditArtMovementFormFinish = async (addOrEditArtMovementFormValues) => {
        console.log('form values');
        console.log(addOrEditArtMovementFormValues);

        const { artMovement: { name, period, periodRange, description } } = addOrEditArtMovementFormValues;
        const [startPeriodYear, endPeriodYear] = periodRange;

        const artMovementToManage = {
            name,
            period,
            startPeriodYear: startPeriodYear.$y,
            endPeriodYear: endPeriodYear ? endPeriodYear.$y : null,
            description,
            imageUrl: null
        }

        if (!artMovementToEditId) {
            if (await artMovementExistsAsync(name)) {
                openArtMovementsManagementNotificationWithIcon('warning', 'Oops', 'Such art movement already exists!');
                return;
            }

            artMovementToManage.createdOn = new Date().getTime();
            artMovementToManage.createdBy = currentUser.username;
            artMovementToManage.modifiedOn = null;
            artMovementToManage.modifiedBy = null;

            console.log('art movement to manage');
            console.log(artMovementToManage);

            await createArtMovementAsync(artMovementToManage);
        } else {
            artMovementToManage.modifiedOn = new Date().getTime();
            artMovementToManage.modifiedBy = currentUser.username;

            await updateArtMovementAsync(artMovementToEditId, artMovementToManage);
            setArtMovementToEditId(null);
        }

        setIsAddOrEditArtMovementModalOpened(false);
        addOrEditArtMovementForm.resetFields();
        loadArtMovementsData();
    }

    const onAddOrEditArtMovementFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteArtMovement = async (artMovementToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${artMovementToDelete.name}?`,
            async onOk() {
                await deleteArtMovementAsync(artMovementToDelete.id);
                loadArtMovementsData();
            },
            centered: true
        })
    }

    const openArtMovementsManagementNotificationWithIcon = (type, message, description, duration) => {
        api[type]({
            message,
            description,
            duration: duration ? duration : 0
        })
    }

    const getArtMovementsColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                    ref={artMovementSearchInput}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
                    onPressEnter={() => handleArtMovementSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleArtMovementSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleArtMovementSearchReset(clearFilters)}
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
                            setArtMovementSearchText(selectedKeys[0]);
                            setArtMovementSearchedColumn(dataIndex);
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
            record[dataIndex].toString().toLowercase().includes(value.toLowercase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => artMovementSearchInput.current?.select())
            }
        },
        render: (artMovementValue) =>
            artMovementSearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[artMovementSearchText]}
                    autoEscape
                    textToHighlight={artMovementValue ? artMovementValue.toString() : ''}
                />
            ) : (
                artMovementValue
            )
    })

    const handleArtMovementSearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setArtMovementSearchText(selectedKeys[0]);
        setArtMovementSearchedColumn(dataIndex);
    }

    const handleArtMovementSearchReset = (clearFilters) => {
        clearFilters();
        setArtMovementSearchText('');
    }

    const artMovementsManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            ...getArtMovementsColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Start Period Year',
            dataIndex: 'startPeriodYear',
            key: 'startPeriodYear',
            width: '25%',
            ...getArtMovementsColumnSearchProps('startPeriodYear'),
            sorter: (a, b) => a.startPeriodYear - b.startPeriodYear
        },
        {
            title: 'End Period Year',
            dataIndex: 'endPeriodYear',
            key: 'endPeriodYear',
            width: '25%',
            ...getArtMovementsColumnSearchProps('endPeriodYear'),
            sorter: (a, b) => a.endPeriodYear - b.endPeriodYear
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '25%',
            render: (_, artMovement) => (
                <Space size="middle">
                    <Button onClick={() => openAddOrEditArtMovementModal(artMovement)}>Edit</Button>
                    <Button type="primary" danger onClick={() => onDeleteArtMovement(artMovement)}>Delete</Button>
                </Space>
            )
        }
    ]

    const fillArtMovementsPeriodsOptions = () => {
        const artMovementsPeriodsOptions = [];

        for (let i = 0; i < artMovementPeriods.length; i++) {
            artMovementsPeriodsOptions.push({
                value: artMovementPeriods[i],
                label: artMovementPeriods[i]
            });
        }

        return artMovementsPeriodsOptions;
    }

    const loadArtMovementsData = async () => {
        setIsArtMovementsDataLoading(true);
        const allArtMovementsToLoad = await getAllArtMovementsAsync();
        setArtMovementsToManage(allArtMovementsToLoad);
        setTimeout(() => {
            setIsArtMovementsDataLoading(false);
        }, 400);
    }

    useEffect(() => {
        loadArtMovementsData();
    }, []);

    return (
        <>
            <div className="art-movements-management-wrapper">
                {notificationContextHolder}
                <Row style={{ marginBottom: 20 }}>
                    <Col span={12} style={{ textAlign: 'left' }}>
                        <Button type="primary" onClick={openAddOrEditArtMovementModal}>
                            Add New Art Movement
                        </Button>
                    </Col>
                    <Col span={12} style={{ textAlign: 'left' }}>
                        <Button type="dashed" style={{ marginRight: 20 }}>Export Art Movements</Button>
                        <Button type="dashed">Import Art Movements</Button>
                    </Col>
                </Row>
                <Modal
                    title={!artMovementToEditId ? 'Add Art Movement' : 'Edit Art Movement'}
                    centered
                    open={isAddOrEditArtMovementModalOpened}
                    onOk={addOrEditArtMovementForm.submit}
                    onCancel={handleCancelAddOrEditArtMovementModal}
                    style={{ marginTop: 100 }}
                    bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
                >
                    <Form
                        {...addOrEditArtMovementFormLayout}
                        form={addOrEditArtMovementForm}
                        name="add-or-edit-art-movement-form"
                        onFinish={onAddOrEditArtMovementFormFinish}
                        onFinishFailed={onAddOrEditArtMovementFormFinishFailed}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            name={['artMovement', 'name']}
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: requiredFieldErrorMessage('art movement', 'name')
                                },
                                {
                                    min: 8,
                                    message: minLengthFieldErrorMessage('art movement', 'name', 8)
                                },
                                {
                                    max: 32,
                                    message: maxLengthFieldErrorMessage('art movement', 'name', 32)
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['artMovement', 'period']}
                            label="Period"
                        >
                            <Select value={artMovementPeriods[0]}>
                                {fillArtMovementsPeriodsOptions().map((artMovementPeriod, index) => (
                                    <Option
                                        key={`ArtMovementPeriod#${index + 1}`}
                                        value={artMovementPeriod.value}
                                    >
                                        {`${artMovementPeriod.label}`}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['artMovement', 'periodRange']}
                            label="Period Span"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the span of art movement period'
                                }
                            ]}
                        >
                            <RangePicker picker="year" allowEmpty={[false, true]} />
                        </Form.Item>
                        <Form.Item
                            name={['artMovement', 'description']}
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: requiredFieldErrorMessage('art movement', 'description')
                                },
                                {
                                    min: 100,
                                    message: minLengthFieldErrorMessage('art movement', 'description', 100)
                                },
                                {
                                    max: 1500,
                                    message: maxLengthFieldErrorMessage('art movement', 'description', 1500)
                                }
                            ]}
                        >
                            <TextArea
                                placeholder="Enter art movement description"
                                rows={10}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
                    columns={artMovementsManagementTableColumns}
                    dataSource={artMovementsToManage}
                    loading={isArtMovementsDataLoading}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30']
                    }}
                />
            </div>
        </>
    )
}