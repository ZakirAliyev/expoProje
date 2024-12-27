import React, { useState } from 'react';
import './index.scss';
import { Table, Dropdown, Menu, Input, Modal, Form, InputNumber, Checkbox, Button, Upload } from 'antd';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import {
    useDeleteCategoryMutation,
    useGetAllCategoriesTreeQuery,
    useGetAllProductsQuery,
} from '../../services/usersApi.jsx';
import { baseURL } from '../../constants.js';
import { PlusOutlined } from '@ant-design/icons';

function ProductPanel() {
    const { data: productsData } = useGetAllProductsQuery();
    const products = productsData?.data || [];

    const { data: categoriesData } = useGetAllCategoriesTreeQuery();
    const categories = categoriesData?.data || [];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isDiscountChecked, setIsDiscountChecked] = useState(false);
    const [isStockChecked, setIsStockChecked] = useState(false);

    const [editProduct] = useDeleteCategoryMutation();
    const [addProduct] = useDeleteCategoryMutation();

    const doesCategoryMatch = (productCategoryId, targetCategoryId, categories) => {
        for (let category of categories) {
            if (category.id === targetCategoryId) return productCategoryId === category.id;
            if (category.subCategories?.length > 0) {
                const match = doesCategoryMatch(productCategoryId, targetCategoryId, category.subCategories);
                if (match) return true;
            }
        }
        return false;
    };

    const renderNestedCategoriesMenu = (categories) => {
        if (!categories || categories.length === 0) return null;

        return categories.map((category) =>
            category.subCategories && category.subCategories.length > 0 ? (
                <Menu.SubMenu key={category.id} title={category.name}>
                    {renderNestedCategoriesMenu(category.subCategories)}
                </Menu.SubMenu>
            ) : (
                <Menu.Item key={category.id} onClick={() => setSelectedCategoryId(category.id)}>
                    {category.name}
                </Menu.Item>
            )
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategoryId
            ? doesCategoryMatch(product.categoryId, selectedCategoryId, categories)
            : true;
        return matchesSearch && matchesCategory;
    });

    const categoriesMenu = (
        <Menu>
            {renderNestedCategoriesMenu(categories)}
        </Menu>
    );

    const handleEditProduct = async (values) => {
        try {
            await editProduct({
                id: editingProduct.id,
                ...values,
                images: fileList.map((file) => file.response?.url || file.url),
            }).unwrap();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleAddProduct = async (values) => {
        try {
            await addProduct({
                ...values,
                images: fileList.map((file) => file.response?.url || file.url),
            }).unwrap();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const uploadProps = {
        action: `${baseURL}/upload`,
        listType: "picture-card",
        fileList,
        onChange: ({ fileList: newFileList }) => setFileList(newFileList),
        beforeUpload: (file) => {
            if (fileList.length >= 5) {
                alert("You can only upload up to 5 images.");
                return false;
            }
            return true;
        },
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Şəkil',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        style={{
                            width: '75px',
                            height: '75px',
                            objectFit: 'cover',
                            padding: '0',
                            borderRadius: '10px',
                        }}
                        src={images?.[0] ? baseURL + images[0] : ''}
                        alt="Product"
                    />
                </div>
            ),
        },
        {
            title: 'Ad',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <span style={{ color: '#0DA5B5', fontWeight: '600' }}>{name}</span>,
        },
        {
            title: 'Qiymət',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Kateqoriya',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Endirimli',
            dataIndex: 'isDiscount',
            key: 'isDiscount',
            render: (isDiscount) => (
                isDiscount ? (
                    <FaCheckCircle style={{ color: 'green' }} />
                ) : (
                    <FaTimesCircle style={{ color: 'red' }} />
                )
            ),
        },
        {
            title: 'Endirimli qiymət',
            dataIndex: 'discountPrice',
            key: 'discountPrice',
            render: (discountPrice) => (
                discountPrice ? <>{discountPrice}</> : <>N/A</>
            ),
        },
        {
            title: 'Stokda',
            dataIndex: 'isStock',
            key: 'isStock',
            render: (isStock) => (
                isStock ? (
                    <FaCheckCircle style={{ color: 'green' }} />
                ) : (
                    <FaTimesCircle style={{ color: 'red' }} />
                )
            ),
        },
        {
            title: 'Stok',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => (stock ? <>{stock}</> : <>N/A</>),
        },
        {
            title: 'Əməliyyatlar',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <FiEdit
                    style={{ cursor: 'pointer', fontSize: '18px' }}
                    onClick={() => {
                        setEditingProduct(record);
                        setFileList(
                            record.images?.map((url, index) => ({
                                uid: index,
                                name: `Image ${index + 1}`,
                                status: 'done',
                                url: baseURL + url,
                            })) || []
                        );
                        setIsDiscountChecked(record.isDiscount);
                        setIsStockChecked(record.isStock);
                        setIsModalVisible(true);
                    }}
                />
            ),
        },
    ];

    return (
        <section id="productPanel">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '40px',
                marginBottom: '20px'
            }}>
                <Input
                    placeholder="Axtar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '300px'
                    }}
                />
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Dropdown overlay={categoriesMenu} trigger={['click']}>
                        <button style={{
                            margin: '0'
                        }} className={"addButton"} href="#" onClick={(e) => e.preventDefault()}>
                            Kateqoriya ilə axtar
                        </button>
                    </Dropdown>
                    <button style={{
                        margin: '0'
                    }} className={"addButton"}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategoryId(null);
                            }}
                    >
                        Hamısını göstər
                    </button>
                    <button
                        className="addButton"
                        style={{ margin: "0" }}
                        onClick={() => {
                            setEditingProduct(null);
                            setFileList([]);
                            setIsDiscountChecked(false);
                            setIsStockChecked(false);
                            setIsModalVisible(true);
                        }}
                    >
                        Məhsul Əlavə Et
                    </button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={filteredProducts}
                rowKey="id"
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => !!record.description,
                }}
            />
            <Modal
                title={editingProduct ? "Məhsul Düzenlə" : "Məhsul Əlavə Et"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                <Form
                    style={{ marginTop: '20px' }}
                    initialValues={editingProduct || { isDiscount: false, isStock: false }}
                    onFinish={(values) => {
                        if (editingProduct) {
                            handleEditProduct(values);
                        } else {
                            handleAddProduct(values);
                        }
                    }}
                    labelCol={{ style: { minWidth: '150px', textAlign: 'start' } }}
                >
                    <Form.Item
                        name="name"
                        label="Ad"
                        rules={[{ required: true, message: 'Məhsul adı tələb olunur!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Qiymət"
                        rules={[{ required: true, message: 'Qiymət tələb olunur!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="isDiscount" valuePropName="checked">
                        <Checkbox onChange={(e) => setIsDiscountChecked(e.target.checked)}>Endirimli</Checkbox>
                    </Form.Item>
                    {isDiscountChecked && (
                        <Form.Item name="discountPrice" label="Endirimli Qiymət">
                            <InputNumber min={0} />
                        </Form.Item>
                    )}
                    <Form.Item name="isStock" valuePropName="checked">
                        <Checkbox onChange={(e) => setIsStockChecked(e.target.checked)}>Stokda</Checkbox>
                    </Form.Item>
                    {isStockChecked && (
                        <Form.Item name="stock" label="Stok">
                            <InputNumber min={0} />
                        </Form.Item>
                    )}
                    <Form.Item label="Şəkillər">
                        <Upload {...uploadProps}>
                            {fileList.length < 5 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Şəkil əlavə et</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#0DA5B5' }}>
                            {editingProduct ? "Yadda Saxla" : "Əlavə Et"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default ProductPanel;
