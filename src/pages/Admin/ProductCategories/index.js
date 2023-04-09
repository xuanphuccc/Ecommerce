import { api } from '@/api';
import { getData } from '@/api/service';
import images from '@/assets/admin/images';
import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import { Pagination } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductCategories() {
    const [categories, setCategories] = useState([]);
    const [promotions, setPromotions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([getData(api.categories), getData(api.promotions)])
            .then((values) => {
                console.log(values);
                setCategories(values[0]);
                setPromotions(values[1]);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    return (
        <>
            <div className={cx('page-header', 'align-middle', 'mt-2')}>
                <h3 className={cx('page-title', 'mt-0')}>Danh mục</h3>
                <nav aria-label="breadcrumb">
                    <ol className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/admin/products">Sản phẩm</Link>
                        </li>
                        <li className={cx('breadcrumb-item', 'active')} aria-current="page">
                            Danh mục
                        </li>
                    </ol>
                </nav>
            </div>
            <div className={cx('card', 'shadow-sm')}>
                <div className={cx('card-body')}>
                    <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
                        <h4 className={cx('card-title', 'm-0')}>Tất cả danh mục</h4>
                        <Link
                            to="/admin/categories/create/0"
                            className={cx('btn', 'btn-sm', 'btn-gradient-primary', 'btn-md')}
                        >
                            Tạo danh mục
                        </Link>
                    </div>

                    <div className={cx('overflow-x-auto', 'w-100')}>
                        <table className={cx('table', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th> Ảnh </th>
                                    <th> Tên danh mục </th>
                                    <th> Khuyến mãi </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr
                                        onClick={() => {
                                            navigate(`/admin/categories/update/${category.categoryId}`);
                                        }}
                                        className={cx('pointer')}
                                        key={category.categoryId}
                                    >
                                        <td className={cx('py-1')}>
                                            <img
                                                src={category.image || images.placeholder}
                                                className={cx('rounded-6')}
                                                alt=""
                                            />
                                        </td>
                                        <td>{category.name}</td>
                                        <td>
                                            {promotions.find((p) => p.promotionId === category.promotionId)?.name ||
                                                'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paging */}
                    <div className={cx('mt-5', 'd-flex', 'justify-content-end')}>
                        <Pagination current={1} onChange={(page, pageSize) => {}} total={1} size="small" simple />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCategories;
