import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Input, Space, Table, Row, Col, notification, Typography, Popconfirm } from "antd";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
import stylesService from "../../../services/styles-service";
import { createStyleAsyncThunk, getAllStylesAsyncThunk, softDeleteStyleAsyncThunk } from "../../../store/features/styles/stylesSlice";
import { useCallback } from "react";
import { useEffect } from "react";

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

    const onAddStyleFormFinished = async (addStyleFormValues) => {
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
}