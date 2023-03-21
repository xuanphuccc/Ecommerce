import styles from '@/components/Admin/Layout/LayoutAdmin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { api } from '@/api';
import { useEffect, useState } from 'react';
import { getData } from '@/api/service';

const cx = classNames.bind(styles);

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    Promise.all([getData(api.products), getData(api.categories), getData(api.providers)])
      .then((values) => {
        console.log(values);
        setProducts(values[0]);
        setCategories(values[1]);
        setProviders(values[2]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <>
      <div className={cx('page-header', 'align-middle')}>
        <h3 className={cx('page-title', 'mt-0')}> Danh sách sản phẩm </h3>
        <nav aria-label="breadcrumb">
          <ol className={cx('breadcrumb')}>
            <li className={cx('breadcrumb-item')}></li>
            <li className={cx('breadcrumb-item', 'active')}>Sản phẩm</li>
          </ol>
        </nav>
      </div>
      <div className={cx('card')}>
        <div className={cx('card-body')}>
          <div className={cx('d-flex', 'justify-between', 'align-items-center', 'mb-5')}>
            <h4 className={cx('card-title', 'mb-0')}>Tất cả sản phẩm</h4>
            <Link to="/admin/products/create" className={cx('btn', 'btn-gradient-primary', 'btn-md')}>
              Thêm sản phẩm
            </Link>
          </div>

          <div className={cx('overflow-x-auto', 'w-100')}>
            <table className={cx('table', 'table-striped')}>
              <thead>
                <tr>
                  <th> Ảnh </th>
                  <th> Tên sản phẩm </th>
                  <th> Kho </th>
                  <th> Danh mục </th>
                  <th> Nhà cung cấp </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td className={cx('py-1')}>
                      <img src={product.image} alt="" />
                    </td>
                    <td>{product.name}</td>
                    <td>
                      {product.items.reduce((total, current) => total + current.qtyInStock, 0)} của{' '}
                      {product.items.length} loại
                    </td>
                    <td>
                      {categories.map((c) => (product.categoriesId.includes(c.categoryId) ? c.name : '')).join(', ')}
                    </td>
                    <td>{providers.find((p) => p.providerId === product.providerId).name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
