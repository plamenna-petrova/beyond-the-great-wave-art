import { Form, Modal, notification, Input, Button, Space, Table, Row, Col, Popconfirm, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import genresService from "../../../services/genres-service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
    maxLengthFieldErrorMessage,
    minLengthFieldErrorMessage,
    requiredFieldErrorMessage
} from "../../../helpers/global-constants";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
    createGenreAsyncThunk,
    softDeleteGenreAsyncThunk,
    getAllGenresAsyncThunk,
    updateGenreAsyncThunk
} from "../../../store/features/genres/genresSlice";

const AddGenreModal = ({ open, onCancel, onFinish, onFinishFailed }) => {
    const [addGenreForm] = Form.useForm();

    const addGenreFormLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    return (
        <Modal
            title="Add Genre"
            centered
            open={open}
            onOk={() => {
                addGenreForm
                    .validateFields()
                    .then((values) => {
                        onFinish(values);
                        addGenreForm.resetFields();
                    });
            }}
            onCancel={() => {
                addGenreForm.resetFields();
                onCancel();
            }}
        >
            <Form
                {...addGenreFormLayout}
                form={addGenreForm}
                name="add-genre-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 6000 }}
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
                            message: minLengthFieldErrorMessage('genre', 'name')
                        },
                        {
                            max: 35,
                            message: maxLengthFieldErrorMessage('genre', 'name')
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const EditableGenreCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    genre,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={['genre', dataIndex]}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: requiredFieldErrorMessage('genre', dataIndex)
                        },
                        {
                            min: 4,
                            message: minLengthFieldErrorMessage('genre', dataIndex, 4)
                        },
                        {
                            max: 35,
                            message: maxLengthFieldErrorMessage('genre', dataIndex, 35)
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

export default function GenresManagement() {
    const genresDataLoadingStatus = useSelector(state => state.genres.loadingStatus);
    const genresToManage = useSelector(state => state.genres.genresToManage);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const [isAddGenreModalOpened, setIsAddGenreModalOpened] = useState(false);
    const [editGenreForm] = Form.useForm();
    const [api, notificationContextHolder] = notification.useNotification();
    const [genreSearchText, setGenreSearchText] = useState('');
    const [genreSearchedColumn, setGenreSearchedColumn] = useState('');
    const genreSearchInput = useRef();
    const { confirm } = Modal;
    const [genreEditingKey, setGenreEditingKey] = useState('');
    const editGenreFormValues = Form.useWatch([], editGenreForm);
    const [isEditGenreFormSubmittable, setIsEditGenreFormSubmittable] = useState(true);

    const openAddOrEditGenreModal = () => {
        setIsAddGenreModalOpened(true);
    }

    const handleCancelAddGenreModal = () => {
        setIsAddGenreModalOpened(false);
    }

    const onAddGenreFormFinish = async (addOrEditGenreFormValues) => {
        const { genre } = addOrEditGenreFormValues;

        if (await genresService.genreExistsAsync(genre.name)) {
            openGenresManagementNotificationWithIcon('warning', 'Oops', 'Such genre already exists!');
            return;
        }

        dispatch(createGenreAsyncThunk({
            genreToCreate: {
                createdBy: currentUser.username,
                ...genre
            }
        }))
            .unwrap()
            .then((_) => {
                loadGenresData();
            })
            .catch((error) => {
                console.log(error);
            });

        setIsAddGenreModalOpened(false);
    }

    const onAddGenreFormFinishFailed = (error) => {
        console.log('error', error);
    }

    const onDeleteGenre = async (genreToDelete) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleOutlined />,
            content: `Do you really wish to remove ${genreToDelete.name}?`,
            async onOk() {
                dispatch(softDeleteGenreAsyncThunk({
                    genreToSoftDeleteId: genreToDelete.id,
                    softDeleteGenreData: {
                        deletedBy: currentUser.username
                    }
                }))
                    .unwrap()
                    .then((_) => {
                        loadGenresData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
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
                    onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
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

    const isGenreEdited = (genre) => genre.id === genreEditingKey;

    const editGenre = (genre) => {
        editGenreForm.setFieldsValue({
            genre: {
                name: genre.name
            }
        });

        setGenreEditingKey(genre.id);
    }

    const onCancelGenreEdit = () => {
        setGenreEditingKey('');
    }

    const onConfirmGenreEdit = async (confirmGenreEditId) => {
        try {
            const { genre } = editGenreFormValues;
            const editableGenres = [...genresToManage];
            const editedGenreIndex = editableGenres.findIndex((genre) => genre.id === confirmGenreEditId);

            if (editedGenreIndex > - 1) {
                const genreToEdit = editableGenres[editedGenreIndex];
                dispatch(updateGenreAsyncThunk({
                    genreToUpdateId: genreToEdit.id,
                    updateGenreData: { modifiedBy: currentUser.username, ...genre }
                }))
                    .unwrap()
                    .then((_) => {
                        editableGenres.splice(editedGenreIndex, 1, { ...genreToEdit, ...genre });
                        loadGenresData();
                        setGenreEditingKey('');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                editableGenres.push(editGenreFormValues);
                setGenreEditingKey('');
            }
        } catch (errorInfo) {
            console.log('Update Failed:', errorInfo);
        }
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
            defaultSortOrder: 'ascend',
            editable: true
        },
        {
            title: 'Actions',
            key: 'genre-actions',
            width: '50%',
            render: (_, genre) => isGenreEdited(genre)
                ? (
                    <span>
                        <Popconfirm
                            title="Save edit of current genre?"
                            onConfirm={() => onConfirmGenreEdit(genre.id)}
                        >
                            <Typography.Link
                                style={{
                                    marginRight: 8
                                }}
                                disabled={!isEditGenreFormSubmittable}
                            >
                                Save
                            </Typography.Link>
                        </Popconfirm>
                        <Popconfirm title="Cancel edit?" onConfirm={onCancelGenreEdit}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space size="middle">
                        <Button disabled={genreEditingKey !== ''} onClick={() => editGenre(genre)}>Edit</Button>
                        <Button type="primary" danger onClick={() => onDeleteGenre(genre)}>Delete</Button>
                    </Space>
                )
        }
    ]

    const mergedGenresManagementTableColumns = genresManagementTableColumns.map((genresManagementTableCol) => {
        if (!genresManagementTableCol.editable) {
            return genresManagementTableCol;
        }

        return {
            ...genresManagementTableCol,
            onCell: (genre) => ({
                genre,
                dataIndex: genresManagementTableCol.dataIndex,
                inputType: 'text',
                title: genresManagementTableCol.title,
                editing: isGenreEdited(genre)
            })
        }
    });

    const loadGenresData = useCallback(() => {
        dispatch(getAllGenresAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadGenresData();
    }, [loadGenresData]);

    useEffect(() => {
        editGenreForm.validateFields()
            .then(
                () => {
                    setIsEditGenreFormSubmittable(true);
                },
                () => {
                    setIsEditGenreFormSubmittable(false);
                }
            )
    }, [editGenreForm, editGenreFormValues]);

    return (
        <div className="genres-management-wrapper">
            {notificationContextHolder}
            <Row style={{ marginBottom: 20 }}>
                <Col span={12} style={{ textAlign: 'left' }}>
                    <Button type="primary" onClick={openAddOrEditGenreModal}>
                        Add New Genre
                    </Button>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="dashed" style={{ marginRight: 20 }}>Export Genres</Button>
                    <Button type="dashed">Import Genres</Button>
                </Col>
            </Row>
            <AddGenreModal
                open={isAddGenreModalOpened}
                onCancel={handleCancelAddGenreModal}
                onFinish={onAddGenreFormFinish}
                onFinishFailed={onAddGenreFormFinishFailed}
            />
            <Form form={editGenreForm} component={false} autoComplete="off">
                <Table
                    rowKey={(genre) => genre.id}
                    components={{
                        body: {
                            cell: EditableGenreCell
                        }
                    }}
                    columns={mergedGenresManagementTableColumns}
                    dataSource={genresToManage}
                    loading={genresDataLoadingStatus === 'pending'}
                    rowClassName="genre-editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                        onChange: onCancelGenreEdit
                    }}
                />
            </Form>
        </div>
    )
}