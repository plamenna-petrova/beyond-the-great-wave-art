import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Space, Table, Tag } from "antd";
import { useState, useRef } from "react"
import { artMovementExistsAsync, createArtMovementAsync, updateArtMovementAsync, getAllArtMovementsAsync, deleteArtMovementAsync } from "../../../services/art-movements-service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { maxLengthFieldErrorMessage, minLengthFieldErrorMessage, requiredFieldErrorMessage } from "../../../helpers/global-constants";
import { useSelector } from "react-redux/es/exports";
import TextArea from "antd/es/input/TextArea";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";

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
    const [filteredArtMovementsInfo, setFilteredArtMovementsInfo] = useState({});

    const openAddOrEditArtMovementModal = (currentArtMovement) => {
        if (currentArtMovement) {

            addOrEditArtMovementForm.setFieldsValue({ 
                artMovement: {
                    name: currentArtMovement.name,
                    description: currentArtMovement.description,
                    period: currentArtMovement.period,
                    periodRange: [
                        dayjs(new Date(currentArtMovement.startPeriodYear + 1, null, null, null, null, null)), 
                        currentArtMovement.endPeriodYear ? 
                            dayjs(new Date(currentArtMovement.endPeriodYear, null, null, null, null, null)) 
                            : null
                    ],
                }
            });
            
            setArtMovementToEditId(currentArtMovement.id);
        } else {
            addOrEditArtMovementForm.setFieldsValue({
                artMovement: {
                    period: artMovementPeriods[0]
                }
            });
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
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    }

    const onAddOrEditArtMovementFormFinish = async (addOrEditArtMovementFormValues) => {
        const { artMovement: { name, period, periodRange, description } } = addOrEditArtMovementFormValues;
        const [startPeriodYear, endPeriodYear] = periodRange;

        const artMovementToManage = {
            name,
            period,
            startPeriodYear: startPeriodYear.$y,
            endPeriodYear: endPeriodYear ? endPeriodYear.$y : null,
            description,
            imageReference: null
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

    const openArtMovementsManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getArtMovementsColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => { event.stopPropagation(); }}
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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

    const handleFilteredArtMovementsInfoChange = (_, filters) => {
        setFilteredArtMovementsInfo(filters);
    };

    const artMovementsManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getArtMovementsColumnSearchProps('name'),
            filteredValue: filteredArtMovementsInfo.name || null,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Period',
            dataIndex: 'period',
            key: 'period',
            width: '20%',
            filters: [...artMovementPeriods.map((amp) => ({ text: amp, value: amp }))],
            filteredValue: filteredArtMovementsInfo.period || null,
            onFilter: (value, artMovement) => artMovement.period.includes(value),
            sorter: (a, b) => a.period.localeCompare(b.period),
            sortDirections: ['ascend', 'descend'],
            render: (_, { period }) => {
                switch (period) {
                    case artMovementPeriods[0]:
                        return (<Tag color='gold'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[1]:
                        return (<Tag color='green'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[2]:
                        return (<Tag color='blue'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[3]:
                        return (<Tag color='red'>{period.toUppercase()}</Tag>)
                    case artMovementPeriods[4]:
                        return (<Tag color='orange'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[5]:
                        return (<Tag color='purple'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[6]:
                        return (<Tag color='cyan'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[7]:
                        return (<Tag color='#b69576'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[8]:
                        return (<Tag color='lime'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[9]:
                        return (<Tag color='#ddb1b1'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[10]:
                        return (<Tag color='#208796'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[11]:
                        return (<Tag color='#fcc7a9'>{period.toUpperCase()}</Tag>)
                    case artMovementPeriods[12]:
                        return (<Tag color='#9c2729'>{period.toUpperCase()}</Tag>)
                    default:
                        break;
                }
            }
        },
        {
            title: 'Start Period Year',
            dataIndex: 'startPeriodYear',
            key: 'startPeriodYear',
            width: '15%',
            ...getArtMovementsColumnSearchProps('startPeriodYear'),
            filteredValue: filteredArtMovementsInfo.startPeriodYear || null,
            sorter: (a, b) => a.startPeriodYear - b.startPeriodYear,
            sortDirections: ['ascend', 'descend'],
            render: (_, { startPeriodYear }) => (<Tag color='magenta'>{startPeriodYear}</Tag>)
        },
        {
            title: 'End Period Year',
            dataIndex: 'endPeriodYear',
            key: 'endPeriodYear',
            width: '15%',
            ...getArtMovementsColumnSearchProps('endPeriodYear'),
            filteredValue: filteredArtMovementsInfo.endPeriodYear || null,
            sorter: (a, b) => a.endPeriodYear - b.endPeriodYear,
            sortDirections: ['ascend', 'descend'],
            render: (_, { endPeriodYear }) => endPeriodYear 
                ? (<Tag color='magenta'>{endPeriodYear}</Tag>) : (<Tag color='volcano'>NOT SPECIFIED</Tag>)
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '30%',
            render: (_, artMovement) => (
                <Space size="middle">
                    <Button>Details</Button>
                    <Button type="primary" onClick={() => openAddOrEditArtMovementModal(artMovement)} ghost>Edit</Button>
                    <Button type="primary" danger onClick={() => onDeleteArtMovement(artMovement)}>Delete</Button>
                </Space>
            )
        }
    ]

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
                        <Button type="primary" onClick={() => openAddOrEditArtMovementModal()}>
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
                                    min: 6,
                                    message: minLengthFieldErrorMessage('art movement', 'name', 6)
                                },
                                {
                                    max: 45,
                                    message: maxLengthFieldErrorMessage('art movement', 'name', 45)
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
                                {artMovementPeriods.map((artMovementPeriod, index) => (
                                    <Option
                                        key={`ArtMovementPeriod#${index + 1}`}
                                        value={artMovementPeriod}
                                    >
                                        {`${artMovementPeriod}`}
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
                                    min: 10,
                                    message: minLengthFieldErrorMessage('art movement', 'description', 10)
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
                                showCount
                                style={{ resize: 'none' }}
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
                    onChange={handleFilteredArtMovementsInfoChange}
                />
            </div>
        </>
    )
}