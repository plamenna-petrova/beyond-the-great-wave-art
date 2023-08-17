import { Form, Modal, notification, Input, Button, Space, Table, Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { createGenreAsync, deleteGenreAsync, genreExistsAsync, getAllGenresAsync, updateGenreAsync } from "../../../services/genres-service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { maxLengthFieldErrorMessage, minLengthFieldErrorMessage, requiredFieldErrorMessage } from "../../../helpers/global-constants";

export default function GenresManagement() {
    const [genresToManage, setGenresToManage] = useState([]);
    const [isGenresDataLoading, setIsGenresDataLoading] = useState(false);
    const [isAddOrEditGenreModalOpened, setIsAddOrEditGenreModalOpened] = useState(false);
    const [genreToEditId, setGenreToEditId] = useState(null);
    const [addOrEditGenreForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [genreSearchText, setGenreSearchText] = useState('');
    const [genreSearchedColumn, setGenreSearchedColumn] = useState('');
    const genreSearchInput = useRef();
    const { confirm } = Modal;

    const openAddOrEditGenreModal = (currentGenre) => {
        if (currentGenre) {
            addOrEditGenreForm.setFieldsValue({ genre: currentGenre });
            setGenreToEditId(currentGenre.id);
        }

        setIsAddOrEditGenreModalOpened(true);
    }

    const handleCancelAddOrEditGenreModal = () => {
        addOrEditGenreForm.resetFields();
        setIsAddOrEditGenreModalOpened(false);

        if (genreToEditId) {
            setGenreToEditId(null);
        }
    }

    const addOrEditGenreModalFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    const onAddOrEditGenreFormFinish = async (addOrEditGenreFormValues) => {
        const { genre } = addOrEditGenreFormValues;

        if (!genreToEditId) {
            if (await genreExistsAsync(genre.name)) {
                openGenresManagementNotificationWithIcon('warning', 'Oops', 'Such genre already exists!');
                return;
            }

            await createGenreAsync(genre);
        } else {
            await updateGenreAsync(genreToEditId, genre);
            setGenreToEditId(null);
        }

        setIsAddOrEditGenreModalOpened(false);
        addOrEditGenreForm.resetFields();
        loadGenresData();
    }

    const onAddOrEditGenreFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteGenre = async (genreToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${genreToDelete.name}?`,
            async onOk() {
                await deleteGenreAsync(genreToDelete.id);
                loadGenresData();
            },
            centered: true
        })
    }

    const openGenresManagementNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })
    }

    const getGenresColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <Input
                    id={`genreSearchInput_${dataIndex}`}
                    ref={genreSearchInput}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value]: [])}
                    onPressEnter={() => handleGenreSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleGenreSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleGenreSearchReset(clearFilters)}
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
                            setGenreSearchText(selectedKeys[0]);
                            setGenreSearchedColumn(dataIndex);
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
                setTimeout(() => genreSearchInput.current?.select(), 100);
            }
        },
        render: (genreValue) =>
            genreSearchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[genreSearchText]}
                    autoEscape
                    textToHighlight={genreValue ? genreValue.toString() : ''} 
                />
            ) : (
               genreValue
            )    
    })

    const handleGenreSearch = (selectedKeys, confirmSearch, dataIndex) => {
        confirmSearch();
        setGenreSearchText(selectedKeys[0]);
        setGenreSearchedColumn(dataIndex);
    }

    const handleGenreSearchReset = (clearFilters) => {
        clearFilters();
        setGenreSearchText('');
    }

    const genresManagementTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'genre-name',
            width: '50%',
            ...getGenresColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend'
        },
        {
            title: 'Actions',
            key: 'genre-actions',
            width: '50%',
            render: (_, genre) => (
                <Space size="middle">
                    <Button onClick={() => openAddOrEditGenreModal(genre)}>Edit</Button>
                    <Button type="primary" danger onClick={() => onDeleteGenre(genre)}>Delete</Button>
                </Space>
            )
        }
    ]

    const loadGenresData = async () => {
        setIsGenresDataLoading(true);
        const allGenresToLoad = await getAllGenresAsync();
        setGenresToManage(allGenresToLoad);
        setTimeout(() => {
            setIsGenresDataLoading(false);
        }, 400);
    }

    useEffect(() => {
        loadGenresData();
    }, []);

    return (
        <div className="genres-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddOrEditGenreModal}>
                        Add New Genre
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Genres</Button>
                    <Button type="dashed">Import Genres</Button>
                </Col>
            </Row>
            <Modal
                title={!genreToEditId ? 'Add Genre' : 'Edit Genre'}
                centered
                open={isAddOrEditGenreModalOpened}
                onOk={addOrEditGenreForm.submit}
                onCancel={handleCancelAddOrEditGenreModal}
            >
                <Form
                    {...addOrEditGenreModalFormLayout}
                    form={addOrEditGenreForm}
                    name="add-or-edit-genre-form"
                    onFinish={onAddOrEditGenreFormFinish}
                    onFinishFailed={onAddOrEditGenreFormFinishFailed}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name={['genre', 'name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: requiredFieldErrorMessage('genre', 'name')
                            },
                            {
                                min: 4,
                                message: minLengthFieldErrorMessage('genre', 'name', 4)
                            },
                            {
                                max: 35,
                                message: maxLengthFieldErrorMessage('genre', 'name', 35)
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                columns={genresManagementTableColumns}
                dataSource={genresToManage}
                loading={isGenresDataLoading}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30']
                }}
            />
        </div>
    )
}