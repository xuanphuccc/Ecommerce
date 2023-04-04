import { api } from '@/api';
import { deleteData, getData, postData, updateData } from '@/api/service';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import notificationsSlice from '@/components/Admin/Notification/notificationsSlice';
import { Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditRoles() {
    const [roleNameInput, setRoleNameInput] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { action, id } = useParams();

    useEffect(() => {
        if (action === 'update') {
            getData(api.roles + '/' + id)
                .then((response) => {
                    console.log(response);
                    setRoleNameInput(response.data.name);
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }, [action, id]);

    // ---------- Handle input change ----------
    const handleRoleNameInputChange = (e) => {
        setRoleNameInput(e.target.value);
    };
    // ---------- End Handle input change ----------

    // ---------- Handle create ----------
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: roleNameInput,
        };

        if (roleNameInput) {
            dispatch(notificationsSlice.actions.showLoading('Đang tạo role'));

            postData(api.roles, data)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Tạo role thành công'));
                        navigate('/admin/manage-roles');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Tạo role không thành công'));
                });
        } else {
            dispatch(notificationsSlice.actions.showError('Tạo role không thành công'));
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        }
    };
    // ---------- End Handle create ----------

    // ---------- Handle update ----------
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: roleNameInput,
        };

        if (roleNameInput) {
            dispatch(notificationsSlice.actions.showLoading('Đang cập nhật'));

            updateData(api.roles + '/' + id, data)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        dispatch(notificationsSlice.actions.showSuccess('Cập nhật thành công'));
                        navigate('/admin/manage-roles');
                    }, 1000);
                })
                .catch((error) => {
                    console.warn(error);
                    dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
                });
        } else {
            dispatch(notificationsSlice.actions.showError('Cập nhật không thành công'));
            setTimeout(() => {
                dispatch(notificationsSlice.actions.destroy());
            }, 1000);
        }
    };
    // ---------- End Handle update ----------

    // ---------- Handle delete ----------
    const handleDelete = () => {
        dispatch(notificationsSlice.actions.showLoading('Đang xóa'));

        deleteData(api.roles + '/' + id)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    dispatch(notificationsSlice.actions.showSuccess('Xóa thành công'));
                    navigate('/admin/manage-roles');
                }, 1000);
            })
            .catch((error) => {
                console.warn(error);
                dispatch(notificationsSlice.actions.showError('Xóa thất bại'));
                setTimeout(() => {
                    dispatch(notificationsSlice.actions.destroy());
                }, 1000);
            });
    };
    // ---------- End Handle delete ----------

    return (
        <>
            <div className={cx('page-header', 'align-middle')}>
                <h3 className={cx('page-title', 'mt-0')}>Tạo mới vai trò</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/manage-roles">Danh sách vai trò</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Tạo vai trò
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('row', 'g-4', 'align-items-start')}>
                <div className={cx('col-md-8', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Tạo vai trò</h4>
                            <p className={cx('card-description')}></p>
                            <form className={cx('forms-sample')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputName1">Tên vai trò *</label>
                                    <input
                                        onChange={handleRoleNameInputChange}
                                        value={roleNameInput}
                                        type="text"
                                        className={cx('form-control', 'form-control-sm', 'border-secondary')}
                                        id="exampleInputName1"
                                        placeholder="Nhập tên vai trò"
                                    />
                                </div>

                                <div>
                                    {action === 'update' ? (
                                        <>
                                            <button
                                                onClick={handleUpdate}
                                                className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                            >
                                                Cập nhật
                                            </button>

                                            <Popconfirm
                                                title="Xóa khuyến mãi"
                                                description="Bạn có chắc chắn muốn xóa vai trò?"
                                                onConfirm={handleDelete}
                                                okText="Xóa"
                                                cancelText="Hủy"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    className={cx('btn', 'btn-inverse-danger', 'me-2')}
                                                >
                                                    Xoá
                                                </button>
                                            </Popconfirm>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className={cx('btn', 'btn-gradient-primary', 'me-2')}
                                        >
                                            Tạo vai trò
                                        </button>
                                    )}

                                    <Link to="/admin/manage-roles" className={cx('btn', 'btn-light')}>
                                        Hủy
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right bar */}
                <div className={cx('col-md-4', 'grid-margin', 'stretch-card')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body')}>
                            <h4 className={cx('card-title')}>Mô tả các quyền</h4>
                            <p className={cx('card-description')}>Roles description</p>
                        </div>
                    </div>
                </div>
                {/* End Right bar */}
            </div>
        </>
    );
}

export default EditRoles;
