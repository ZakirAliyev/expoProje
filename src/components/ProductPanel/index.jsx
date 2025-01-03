import React, {useEffect, useState} from 'react';
import './index.scss';
import {Table, Dropdown, Menu, Input, Modal, Form, InputNumber, Checkbox, Button, Upload, Select, message} from 'antd';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {
    useDeleteCategoryMutation, useDeleteProductMutation,
    useGetAllCategoriesTreeQuery,
    useGetAllProductsQuery, usePostCreateProductMutation, usePostUpdateProductMutation,
} from '../../services/usersApi.jsx';
import {baseURL} from '../../constants.js';
import {PlusOutlined} from '@ant-design/icons';

function ProductPanel() {

    const {Option, OptGroup} = Select;

    const {data: productsData, refetch: refetchProducts} = useGetAllProductsQuery();

    const products = productsData?.data || [];

    const {data: categoriesData, refetch: refetchCategories} = useGetAllCategoriesTreeQuery();
    const categories = categoriesData?.data || [];

    const [categories1, setCategories1] = useState([]);
    const {data, statusCode} = useGetAllCategoriesTreeQuery();

    useEffect(() => {
        if (statusCode === 200) {
            setCategories1(data);
        }
    }, [data, statusCode]);

    const [postCreateProduct] = usePostCreateProductMutation()
    const [postUpdateProduct] = usePostUpdateProductMutation()

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isDiscountChecked, setIsDiscountChecked] = useState(false);
    const [isStockChecked, setIsStockChecked] = useState(false);

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
            const formData = new FormData();
            formData.append("id", values.id);
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("isDiscount", values.isDiscount);
            formData.append("categoryId", values.categoryId);
            silinenSekiller.forEach((sekil) => {
                formData.append("deleteImageName", sekil);
            })
            if (values.isDiscount) {
                formData.append("discountPrice", values.discountPrice);
            }
            formData.append("isStock", values.isStock);
            if (values.isStock) {
                formData.append("stock", values.stock);
            }

            fileList.forEach((file) => {
                formData.append("images", file.originFileObj);
                console.log(file?.url)
            });

            // Backend-ə göndərin
            const response = await postUpdateProduct(formData).unwrap();

            if (response?.statusCode === 201) {
                alert("Məhsul uğurla əlavə edildi.");
                refetchProducts()
                refetchCategories()
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            alert("Xəta baş verdi.");
        }
    };

    const handleAddProduct = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("isDiscount", values.isDiscount);
            formData.append("categoryId", values.categoryId);
            if (values.isDiscount) {
                formData.append("discountPrice", values.discountPrice);
            }
            formData.append("isStock", values.isStock);
            if (values.isStock) {
                formData.append("stock", values.stock);
            }

            // Şəkilləri əlavə edin
            fileList.forEach((file) => {
                formData.append("images", file.originFileObj);
            });

            // Backend-ə göndərin
            console.log(values)
            const response = await postCreateProduct(formData).unwrap();

            if (response?.statusCode === 201) {
                alert("Məhsul uğurla əlavə edildi.");
                refetchProducts()
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            alert("Xəta baş verdi.");
        }
    };

    const [silinenSekiller, setSilinenSekiller] = useState([]);

    const uploadProps = {
        listType: "picture-card",
        fileList,
        onChange: ({fileList: newFileList}) => {
            setFileList(
                newFileList
                    .map((file) => {
                        if (!file.originFileObj && !file.url) {
                            console.error("Fayl obyektində problem var:", file);
                            return null;
                        }
                        return file;
                    })
                    .filter(Boolean)
            );
        },
        beforeUpload: (file) => {
            setFileList((prevList) => [...prevList, file]);
            return false; // Faylın dərhal yüklənməsini blokla
        },
        onRemove: (file) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));

            // URL-dən yalnız `pictures/`-dən sonrakı hissəni əldə et
            const trimmedUrl = file.url.split("pictures/")[1]; // "7d348f3a-a51d-4199-b538-0d3079bb2128.png"

            setSilinenSekiller((prevSilinenSekiller) => {
                const yeniSilinenler = [...prevSilinenSekiller, trimmedUrl];
                console.log(yeniSilinenler); // Düzgün massiv göstəriləcək
                return yeniSilinenler;
            });
        },
        multiple: true,
    };

    const handleEditClick = () => {
        setSilinenSekiller([]);
        // refetch()
    };

    useEffect(() => {
        if (editingProduct) {
            setIsDiscountChecked(editingProduct.isDiscount || false);
            setIsStockChecked(editingProduct.isStock || false);
        } else {
            setIsDiscountChecked(false);
            setIsStockChecked(false);
        }
    }, [editingProduct]);

    useEffect(() => {
        if (isModalVisible === false) {
            refetchProducts();
            refetchCategories();
        }
    }, [isModalVisible]);

    const [deleteProduct] = useDeleteProductMutation()


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
            render: (name) => <span style={{color: '#0DA5B5', fontWeight: '600'}}>{name}</span>,
        },
        {
            title: 'Qiymət',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span style={{color: '#454545', fontWeight: '600'}}>{price} AZN</span>,
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
                    <FaCheckCircle style={{color: 'green'}}/>
                ) : (
                    <FaTimesCircle style={{color: 'red'}}/>
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
                    <FaCheckCircle style={{color: 'green'}}/>
                ) : (
                    <FaTimesCircle style={{color: 'red'}}/>
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
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    <FiEdit
                        style={{cursor: 'pointer', fontSize: '18px'}}
                        onClick={() => {
                            handleEditClick()
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
                    <FiTrash
                        style={{cursor: 'pointer', fontSize: '18px'}}
                        onClick={async () => {
                            try {
                                const response = await deleteProduct(record?.id).unwrap()
                                if (response.statusCode === 200) {
                                    message.success("Məhsul uğurlu silindi!")
                                    refetchCategories()
                                    refetchProducts()
                                }
                            } catch (error) {
                                message.error("Xəya baş verdi!")
                            }
                        }}
                    />
                </div>
            ),
        },
    ];
    const [form] = Form.useForm();
    useEffect(() => {
        if (editingProduct) {
            form.setFieldsValue({
                name: editingProduct.name || '',
                price: editingProduct.price || 0,
                isDiscount: editingProduct.isDiscount || false,
                discountPrice: editingProduct.discountPrice || undefined,
                isStock: editingProduct.isStock || false,
                stock: editingProduct.stock || undefined,
                categoryId: editingProduct.categoryId || undefined,
                description: editingProduct.description || undefined,
            });
            setIsDiscountChecked(editingProduct.isDiscount || false);
            setIsStockChecked(editingProduct.isStock || false);
        } else {
            form.resetFields();
            setIsDiscountChecked(false);
            setIsStockChecked(false);
        }
    }, [editingProduct, form]);

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
                <div style={{display: 'flex', gap: '16px'}}>
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
                        style={{margin: "0"}}
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
                    expandedRowRender: (record) => <p style={{margin: 0}}>{record.description}</p>,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{
                    pageSize: 5
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
                    form={form}
                    onFinish={(values) => {
                        const modifiedValues = {
                            ...values,
                            id: editingProduct?.id ?? false,
                            isDiscount: values.isDiscount ?? false,
                            isStock: values.isStock ?? false,
                        };
                        if (editingProduct) {
                            handleEditProduct(modifiedValues);
                        } else {
                            handleAddProduct(modifiedValues);
                        }
                    }}
                    labelCol={{style: {minWidth: '150px', textAlign: 'start'}}}
                >
                    <Form.Item label="Kategori Seç" name="categoryId">
                        <Select placeholder="Kategori seçin" allowClear>
                            {categories.map((category) =>
                                    category.subCategories && category.subCategories.length > 0 && (
                                        <OptGroup key={category.id} label={category.name}>
                                            {category.subCategories.map((subCategory) => (
                                                <Option key={subCategory.id} value={subCategory.id}>
                                                    {subCategory.name}
                                                </Option>
                                            ))}
                                        </OptGroup>
                                    )
                            )}
                        </Select>

                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Ad"
                        rules={[{required: true, message: 'Məhsul adı tələb olunur!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Qiymət"
                        rules={[{required: true, message: 'Qiymət tələb olunur!'}]}
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Təsvir"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="isDiscount"
                        valuePropName="checked"
                    >
                        <Checkbox onChange={(e) => setIsDiscountChecked(e.target.checked)}>
                            Endirimli
                        </Checkbox>
                    </Form.Item>
                    {isDiscountChecked && (
                        <Form.Item
                            name="discountPrice"
                            label="Endirimli Qiymət"
                            rules={[{required: true, message: 'Endirimli qiymət tələb olunur!'}]}
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                    )}
                    <Form.Item
                        name="isStock"
                        valuePropName="checked"
                    >
                        <Checkbox onChange={(e) => setIsStockChecked(e.target.checked)}>
                            Stokda
                        </Checkbox>
                    </Form.Item>
                    {isStockChecked && (
                        <Form.Item
                            name="stock"
                            label="Stok"
                            rules={[{required: true, message: 'Stok miqdarı tələb olunur!'}]}
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Şəkillər"
                        rules={[{required: true, message: "Ən az bir şəkil əlavə edin!"}]}
                    >
                        <Upload {...uploadProps}>
                            {fileList.length < 5 && (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: '#0DA5B5'}}>
                            {editingProduct ? 'Yadda Saxla' : 'Əlavə Et'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default ProductPanel;
