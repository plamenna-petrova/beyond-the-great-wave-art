import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    List,
    Modal,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    theme,
    Steps,
    Upload,
    message
} from "antd";
import { useState, useRef } from "react"
import artMovementsService from "../../../services/art-movements-service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import {
    maxLengthFieldErrorMessage,
    minLengthFieldErrorMessage,
    requiredFieldErrorMessage
} from "../../../helpers/global-constants";
import { useSelector, useDispatch } from "react-redux/es/exports";
import TextArea from "antd/es/input/TextArea";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";
import { useCallback } from "react";
import { 
    createArtMovementAsyncThunk, 
    getAllArtMovementsAsyncThunk, 
    softDeleteArtMovementAsyncThunk, 
    updateArtMovementAsyncThunk 
} from "../../../store/features/art-movements/artMovementsSlice";
import { firestore, storage } from "../../../firebase";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    const artMovementsDataLoadingStatus = useSelector(state => state.artMovements.loadingStatus);
    const artMovementsToManage = useSelector(state => state.artMovements.artMovementsToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddOrEditArtMovementModalOpened, setIsAddOrEditArtMovementModalOpened] = useState(false);
    const [artMovementToEditId, setArtMovementToEditId] = useState(null);
    const [addOrEditArtMovementPrimaryInformationForm] = Form.useForm();
    const [artMovementImageFileList, setArtMovementImageFileList] = useState([]);
    const [isImageUploadActive, setIsImageUploadActive] = useState(false);
    const [isUploadedImagePreviewVisible, setIsUploadedImagePreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [uploadedImagePreviewTitle, setUploadedImagePreviewTitle] = useState(false);
    const { Dragger } = Upload;
    const [addOrEditArtMovementTertiaryInformationForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [artMovementSearchText, setArtMovementSearchText] = useState('');
    const [artMovementSearchedColumn, setArtMovementSearchedColumn] = useState('');
    const artMovementSearchInput = useRef(null);
    const { confirm, info } = Modal;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const [filteredArtMovementsInfo, setFilteredArtMovementsInfo] = useState({});
    const [selectedArtMovementsRowKeys, setSelectedArtMovementsRowKeys] = useState([]);
    const { token } = theme.useToken();
    const [artMovementStepperCurrentStep, setArtMovementStepperCurrentStep] = useState(0);
    const [
        addOrEditArtMovementPrimaryInformationFormValues, 
        setAddOrEditArtMovementPrimaryInformationFormValues
    ] = useState({
        name: null,
        period: artMovementPeriods[0],
        periodRange: null
    });
    const [
        addOrEditArtMovementTertiaryInformationFormValues, 
        setAddOrEditArtMovementTertiaryInformationFormValues
    ] = useState({
        description: null
    });

    const openAddOrEditArtMovementModal = (currentArtMovement) => {
        addOrEditArtMovementPrimaryInformationForm.resetFields();
        addOrEditArtMovementTertiaryInformationForm.resetFields();

        if (currentArtMovement) {
            setAddOrEditArtMovementPrimaryInformationFormValues({
                name: currentArtMovement.name,
                period: currentArtMovement.period,
                periodRange: [
                    dayjs(new Date(currentArtMovement.startPeriodYear + 1, null, null, null, null, null)),
                    currentArtMovement.endPeriodYear ?
                        dayjs(new Date(currentArtMovement.endPeriodYear, null, null, null, null, null))
                        : null
                ]
            });

            setAddOrEditArtMovementTertiaryInformationFormValues({
                description: currentArtMovement.description
            });

            setArtMovementToEditId(currentArtMovement.id);
        } else {
            setAddOrEditArtMovementPrimaryInformationFormValues({
                name: null,
                period: artMovementPeriods[0],
                periodRange: null
            });

            setAddOrEditArtMovementTertiaryInformationFormValues({
                description: null
            });
        }

        setArtMovementStepperCurrentStep(0);
        setIsAddOrEditArtMovementModalOpened(true);
    }

    const handleCancelAddOrEditArtMovementModal = () => {
        setIsAddOrEditArtMovementModalOpened(false);

        if (artMovementToEditId) {
            setArtMovementToEditId(null);
        }
    }

    const artMovementFormLayout = {
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
            if (await artMovementsService.artMovementExistsAsync(name)) {
                openArtMovementsManagementNotificationWithIcon('warning', 'Oops', 'Such art movement already exists!');
                return;
            }

            dispatch(createArtMovementAsyncThunk({
                artMovementToCreate: {
                    createdBy: currentUser.username,
                    ...artMovementToManage
                }
            }))
                .unwrap()
                .then((_) => {
                    loadArtMovementsData();
                    setIsAddOrEditArtMovementModalOpened(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            dispatch(updateArtMovementAsyncThunk({
                artMovementToUpdateId: artMovementToEditId,
                updateArtMovementData: { 
                    modifiedBy: currentUser.username, 
                    ...artMovementToManage 
                }
            }))
                .unwrap()
                .then((_) => {
                    loadArtMovementsData();
                    setIsAddOrEditArtMovementModalOpened(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const onAddOrEditArtMovementFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const handleCancelImageUpload = () => {
        setIsUploadedImagePreviewVisible(false);
    }

    const handleImagePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originalFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setIsUploadedImagePreviewVisible(true);
        setUploadedImagePreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    }

    const beforeUpload = (file) => {
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            message.error(`${file.name} is not a valid image type`, 2);
            return null;
        }

        return false;
    }

    const handleImageChange = ({ fileList }) => {
        setArtMovementImageFileList(fileList.filter(file => file.status !== 'error'));
    }

    const onImageRemove = async (file) => {
        const index = artMovementImageFileList.indexOf(file);
        const newFileList = artMovementImageFileList.slice();
        newFileList.splice(index, 1);
        setArtMovementImageFileList(newFileList);
    }

    const handleImageUploadFinish = async (values) => {
        try {
            setIsImageUploadActive(true);

            await Promise.all(
                artMovementImageFileList.map(async (file) => {
                    const fileName = `art-movements/${Date.now()}-${file.name}`;
                    const imageReference = ref(storage, `images/${fileName}`);
                    
                    try {
                        uploadBytes(imageReference, file).then((snapshot) => {
                            getDownloadURL(snapshot.ref).then((url) => {
                                console.log('URL');
                                console.log(url);
                            })
                        })
                    } catch (error) {
                        console.log(error);
                    }
                })
            );

            setArtMovementImageFileList([]);
            message.success(`Images uploaded successfully.`, 2);
        } catch (error) {
            console.log(error);
            message.error(`Error adding images.`, 2);
        } finally {
            setIsImageUploadActive(false);
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            console.log('THE FILE');
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        })
    }

    const onOpenArtMovementDetailsModal = (currentArtMovement) => {
        const { name, createdOn, createdBy, modifiedOn, modifiedBy } = currentArtMovement;

        const artMovementDetails = [
            {
                title: 'Created On',
                value: createdOn
            },
            {
                title: 'Created By',
                value: createdBy
            },
            {
                title: 'Modified On',
                value: modifiedOn
            },
            {
                title: 'Modified By',
                value: modifiedBy
            }
        ]

        info({
            title: `${name}'s Details`,
            content: (
                <List
                    size="small"
                    bordered
                    style={{ marginTop: 10 }}
                    dataSource={artMovementDetails}
                    renderItem={({ title, value }) => (
                        <List.Item key={title}>
                            <List.Item.Meta
                                title={<Typography.Text>{title}</Typography.Text>}
                            />
                            <div style={{ justifyContent: 'right' }}>
                                {value
                                    ? isValidTimestamp(value) > 0
                                        ? <Typography.Text>
                                            {dayjs(new Date(value)).format('MMM D, YYYY h:mm A')}
                                        </Typography.Text>
                                        : <Typography.Text>{value}</Typography.Text>
                                    : <Typography.Text mark>{'NOT YET SPECIFIED'}</Typography.Text>
                                }
                            </div>
                        </List.Item>
                    )}
                />
            ),
            centered: true
        })
    }

    const isValidTimestamp = (timestamp) => isNumeric(new Date(timestamp).getTime());

    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    const onDeleteArtMovement = async (artMovementToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${artMovementToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteArtMovementAsyncThunk({
                    artMovementToSoftDeleteId: artMovementToDelete.id,
                    softDeleteArtMovementData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadArtMovementsData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
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

    const onSelectedArtMovementsRowKeysChange = (newSelectedArtMovementsRowKeys) => {
        setSelectedArtMovementsRowKeys(newSelectedArtMovementsRowKeys);
    }

    const switchToNextStep = () => {
        switch (artMovementStepperCurrentStep) {
            case 0:
                addOrEditArtMovementPrimaryInformationForm
                    .validateFields()
                    .then(() => {
                        setArtMovementStepperCurrentStep(artMovementStepperCurrentStep + 1);
                    })
                    .catch((error) => {
                        console.log('validation failed', error);
                    });
                break;
            case 1:
                setArtMovementStepperCurrentStep(artMovementStepperCurrentStep + 1);
                break;
            default:
                break;
        }
    }

    const switchToPreviousStep = () => {
        switch (artMovementStepperCurrentStep) {
            case addOrEditArtMovementSteps.length - 1:
                // addOrEditArtMovementTertiaryInformationForm.submit();
                addOrEditArtMovementTertiaryInformationForm
                    .validateFields()
                    .then(() => {
                        setArtMovementStepperCurrentStep(artMovementStepperCurrentStep - 1);
                    })
                    .catch((errorInfo) => {
                        console.log('validation failed', errorInfo);
                    })
                break;
            case addOrEditArtMovementSteps.length - 2:
                setArtMovementStepperCurrentStep(artMovementStepperCurrentStep - 1);
                break;
            default:
                break;
        }
    }

    const tailLayout = {
        wrapperCol: {
            offset: 18,
            span: 12
        }
    }

    const addOrEditArtMovementSteps = [
        {
            title: 'General',
            content: (
                <Form
                    {...artMovementFormLayout}
                    form={addOrEditArtMovementPrimaryInformationForm}
                    initialValues={addOrEditArtMovementPrimaryInformationFormValues}
                    name="add-or-edit-art-movement-primary-information-form"
                    // onFinish={() => { setArtMovementStepperCurrentStep(artMovementStepperCurrentStep + 1) }}
                    onFinish={(values) => { console.log('finished', values); }}
                    style={{ maxWidth: 600, padding: 10 }}
                >
                    <Form.Item
                        name="name"
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
                        name="period"
                        label="Period"
                    >
                        <Select defaultActiveFirstOption>
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
                        name="periodRange"
                        label="Period Span"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the span of art movement period'
                            }
                        ]}
                    >
                        <RangePicker picker="year" allowEmpty={[false, true]} style={{ width: 100 + '%' }} />
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Image',
            content: (
                <Form
                  onFinish={handleImageUploadFinish}
                >
                    <div className="upload-container">
                        <Dragger
                            listType="picture-card"
                            fileList={artMovementImageFileList}
                            beforeUpload={beforeUpload}
                            onPreview={handleImagePreview}
                            onChange={handleImageChange}
                            onRemove={onImageRemove}
                            multiple={true}
                            maxCount={4}
                        >
                            <div className="upload-icon">
                                <UploadOutlined />
                            </div>
                            <div className="upload-text">
                                <p>Drag and drop here</p>
                                <p>OR</p>
                                <p>Click</p>
                            </div>
                        </Dragger>
                    </div>
                    <Form.Item {...tailLayout}>
                        <Button shape="round" htmlType="submit">
                            {isImageUploadActive ? "Uploading" : "Upload"}
                        </Button>
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Description',
            content: (
                <Form
                    {...artMovementFormLayout}
                    form={addOrEditArtMovementTertiaryInformationForm}
                    initialValues={addOrEditArtMovementTertiaryInformationFormValues}
                    name="add-or-edit-art-movement-tertiary-information-form"
                    // onFinish={() => {
                    //     setArtMovementStepperCurrentStep(artMovementStepperCurrentStep - 1)
                    // }}
                    onFinish={(values) => { console.log('description', values); }}
                    style={{ maxWidth: 600, padding: 10 }}
                >
                    <Form.Item
                        name="description"
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
                            rows={12}
                            showCount
                            style={{ resize: 'none' }}
                        />
                    </Form.Item>
                </Form>
            )
        }
    ]

    const artMovementStepperItems = addOrEditArtMovementSteps.map((step) => ({
        key: step.title,
        title: step.title
    }));

    const artMovementStepperContentStyle = {
        lineHeight: '320px',
        padding: 15,
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16
    }

    const artMovementsRowSelection = {
        selectedArtMovementsRowKeys,
        onChange: onSelectedArtMovementsRowKeysChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
        ]
    }

    const artMovementsManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getArtMovementsColumnSearchProps('name'),
            filteredValue: filteredArtMovementsInfo.name || null,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend'
        },
        {
            title: 'Period',
            dataIndex: 'period',
            key: 'period',
            width: '20%',
            filters: [...artMovementPeriods.map((amp) => ({ text: amp, value: amp }))],
            filteredValue: filteredArtMovementsInfo.period || null,
            filterSearch: true,
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
                        return (<Tag color='red'>{period.toUpperCase()}</Tag>)
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
                ? (<Tag color='magenta'>{endPeriodYear}</Tag>) : (<Tag color='volcano'>NOT YET SPECIFIED</Tag>)
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '30%',
            render: (_, artMovement) => (
                <Space size="middle">
                    <Button onClick={() => onOpenArtMovementDetailsModal(artMovement)}>Details</Button>
                    <Button type="primary" onClick={() => openAddOrEditArtMovementModal(artMovement)} ghost>Edit</Button>
                    <Button type="primary" danger onClick={() => onDeleteArtMovement(artMovement)}>Delete</Button>
                </Space>
            )
        }
    ]

    const loadArtMovementsData = useCallback(() => {
        dispatch(getAllArtMovementsAsyncThunk());
    }, [dispatch])

    useEffect(() => {
        loadArtMovementsData();
    }, [loadArtMovementsData]);

    useEffect(() => {
        console.log('setting values');
        console.log(addOrEditArtMovementPrimaryInformationFormValues);

        addOrEditArtMovementPrimaryInformationForm.setFieldsValue({
            name: addOrEditArtMovementPrimaryInformationFormValues.name,
            period: addOrEditArtMovementPrimaryInformationFormValues.period,
            periodRange: addOrEditArtMovementPrimaryInformationFormValues.periodRange
        })

    }, [addOrEditArtMovementPrimaryInformationForm, addOrEditArtMovementPrimaryInformationFormValues]);

    useEffect(() => {
        addOrEditArtMovementTertiaryInformationForm.setFieldsValue({
            description: addOrEditArtMovementTertiaryInformationFormValues.description
        })
    }, [addOrEditArtMovementTertiaryInformationForm, addOrEditArtMovementTertiaryInformationFormValues]);

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
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type="dashed" style={{ marginRight: 20 }}>Export Art Movements</Button>
                        <Button type="dashed">Import Art Movements</Button>
                    </Col>
                </Row>
                <Modal
                    title={!artMovementToEditId ? 'Add Art Movement' : 'Edit Art Movement'}
                    centered
                    open={isAddOrEditArtMovementModalOpened}
                    onCancel={handleCancelAddOrEditArtMovementModal}
                    style={{ marginTop: 100 }}
                    bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
                    footer={null}
                >
                    <Form.Provider
                        onFormFinish={(name, { values, forms }) => {
                            console.log('provider');
                            console.log('name');
                            console.log(name);
                            console.log('values');
                            console.log(values);
                            console.log('forms');
                            console.log(forms);
                        }}
                    >
                        <Steps current={artMovementStepperCurrentStep} items={artMovementStepperItems} />
                        <div style={artMovementStepperContentStyle}>
                            {addOrEditArtMovementSteps[artMovementStepperCurrentStep].content}
                        </div>
                        <div
                            style={{
                                marginTop: 24
                            }}
                        >
                            {artMovementStepperCurrentStep < addOrEditArtMovementSteps.length - 1 && (
                                <Button htmlType="submit" type="primary" onClick={() => switchToNextStep()}>
                                    Next
                                </Button>
                            )}
                            {artMovementStepperCurrentStep === addOrEditArtMovementSteps.length - 1 && (
                                <Button type="primary" onClick={() => {
                                    
                                }}>
                                    Done
                                </Button>
                            )}
                            {artMovementStepperCurrentStep > 0 && (
                                <Button
                                    htmlType="submit"
                                    style={{
                                        margin: '0 8px'
                                    }}
                                    onClick={() => switchToPreviousStep()}
                                >
                                    Back
                                </Button>
                            )}
                        </div>
                    </Form.Provider>
                </Modal>
                <Table
                    rowKey={(artMovement) => artMovement.id}
                    columns={artMovementsManagementTableColumns}
                    dataSource={artMovementsToManage}
                    loading={artMovementsDataLoadingStatus === 'pending'}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30']
                    }}
                    expandable={{
                        expandedRowRender: (artMovement) => (
                            <p
                                style={{
                                    margin: 0,
                                    textAlign: 'justify'
                                }}
                            >
                                <Typography.Text mark>DESCRIPTION:</Typography.Text> {artMovement.description}
                            </p>
                        ),
                    }}
                    rowSelection={artMovementsRowSelection}
                    onChange={handleFilteredArtMovementsInfoChange}
                />
            </div>
        </>
    )
}