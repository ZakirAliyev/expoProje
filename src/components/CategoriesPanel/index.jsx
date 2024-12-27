import './index.scss';
import { Table, Modal, Form, Input, Button } from 'antd';
import {
    useDeleteCategoryMutation,
    useGetAllCategoriesTreeQuery,
    usePostNewCategoryMutation,
    usePutCategoryMutation,
} from '../../services/usersApi.jsx';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import Swal from 'sweetalert2';

function CategoriesPanel() {
    const { data: getAllCategoriesTree, refetch } = useGetAllCategoriesTreeQuery();
    const categories = getAllCategoriesTree?.data || [];
    const [postNewCategory] = usePostNewCategoryMutation();
    const [putCategory] = usePutCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isSubCategoriesModalVisible, setIsSubCategoriesModalVisible] = useState(false);
    const [isSubCategoryAddModalVisible, setIsSubCategoryAddModalVisible] = useState(false);

    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [subCategoryForm] = Form.useForm();

    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleEditCancel = () => setIsEditModalVisible(false);
    const handleSubCategoriesCancel = () => setIsSubCategoriesModalVisible(false);
    const handleSubCategoryAddCancel = () => setIsSubCategoryAddModalVisible(false);

    const handleAddCategory = async () => {
        try {
            const values = await form.validateFields();
            const response = await postNewCategory(values).unwrap();

            if (response?.statusCode === 201) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Kateqoriya əlavə olundu.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                form.resetFields();
                refetch();
                setIsModalVisible(false);
                setIsEditModalVisible(false);
                setIsSubCategoryAddModalVisible(false);
                setIsSubCategoriesModalVisible(false);
            }
        } catch (error) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Xəta baş verdi! Zəhmət olmasa bir daha cəhd edin.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleEditCategory = async () => {
        try {
            const values = await editForm.validateFields();
            const payload = { id: editingCategory.id, ...values };

            if (editingCategory.superCategoryId) {
                payload.superCategoryId = editingCategory.superCategoryId;
            }

            const response = await putCategory(payload).unwrap();

            if (response?.statusCode === 200) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Kateqoriya uğurla redaktə olundu.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
                setIsModalVisible(false);
                setIsEditModalVisible(false);
                setIsSubCategoryAddModalVisible(false);
                setIsSubCategoriesModalVisible(false);
            }
        } catch (error) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Xəta baş verdi! Zəhmət olmasa bir daha cəhd edin.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId).unwrap();
            if (response?.statusCode === 200) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Kateqoriya uğurla silindi.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
                setIsModalVisible(false);
                setIsEditModalVisible(false);
                setIsSubCategoryAddModalVisible(false);
                setIsSubCategoriesModalVisible(false);
            }
        } catch (error) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: error?.data?.message || 'Xəta baş verdi! Zəhmət olmasa bir daha cəhd edin.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleAddSubCategory = async () => {
        try {
            const values = await subCategoryForm.validateFields();
            const payload = { ...values };

            if (selectedCategory?.id) {
                payload.superCategoryId = selectedCategory.id;
            }

            const response = await postNewCategory(payload).unwrap();

            if (response?.statusCode === 201) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alt kateqoriya əlavə olundu.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                subCategoryForm.resetFields();
                refetch();
                setIsModalVisible(false);
                setIsEditModalVisible(false);
                setIsSubCategoryAddModalVisible(false);
                setIsSubCategoriesModalVisible(false);
            }
        } catch (error) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Xəta baş verdi! Zəhmət olmasa bir daha cəhd edin.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const openSubCategoriesModal = (category) => {
        setSelectedCategory(category);
        setIsSubCategoriesModalVisible(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Kateqoriya adı',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span
                    className={"span111"}
                    onClick={() => openSubCategoriesModal(record)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Alt kateqoriyaların sayı',
            key: 'subCategoriesCount',
            render: (text, record) => Array.isArray(record?.subCategories) ? record.subCategories.length : 0,
        },
        {
            title: 'Əməliyyatlar',
            key: 'actions',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <FaRegEdit
                        className="iconcate iconcateyel"
                        onClick={() => {
                            setEditingCategory(record);
                            editForm.setFieldsValue({ name: record.name });
                            setIsEditModalVisible(true);
                        }}
                    />
                    <FaRegTrashAlt
                        className="iconcate iconcatered"
                        onClick={() => {
                            Swal.fire({
                                title: 'Əminsiniz?',
                                text: 'Bu kateqoriyanı silmək istədiyinizə əminsiniz?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Bəli, sil!',
                                cancelButtonText: 'Xeyr, ləğv et',
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    await handleDeleteCategory(record.id);
                                }
                            });
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <section id="categoriesPanel">
            <button className="addButton" onClick={showModal}>
                Kateqoriya əlavə et
            </button>
            <Table
                columns={columns}
                dataSource={categories}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 6,
                }}
            />
            <Modal
                title="Yeni Kateqoriya Əlavə Et"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Ləğv et
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddCategory}>
                        Əlavə et
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Kateqoriya adı"
                        name="name"
                        rules={[{ required: true, message: 'Zəhmət olmasa kateqoriya adını daxil edin!' }]}
                    >
                        <Input placeholder="Kateqoriya adını daxil edin" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Kateqoriyanı Redaktə Et"
                open={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="back" onClick={handleEditCancel}>
                        Ləğv et
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleEditCategory}>
                        Saxla
                    </Button>,
                ]}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        label="Kateqoriya adı"
                        name="name"
                        rules={[{ required: true, message: 'Zəhmət olmasa kateqoriya adını daxil edin!' }]}
                    >
                        <Input placeholder="Kateqoriya adını daxil edin" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={`Alt Kateqoriyalar: ${selectedCategory?.name || ''}`}
                open={isSubCategoriesModalVisible}
                onCancel={handleSubCategoriesCancel}
                footer={null}
                width={1000}
            >
                <button
                    className="addButton111"
                    style={{ marginTop: '20px' }}
                    onClick={() => setIsSubCategoryAddModalVisible(true)}
                >
                    Alt Kateqoriya əlavə et
                </button>
                <Table
                    columns={columns}
                    dataSource={selectedCategory?.subCategories || []}
                    rowKey={(record) => record.id}
                />
            </Modal>
            <Modal
                title="Yeni Alt Kateqoriya Əlavə Et"
                open={isSubCategoryAddModalVisible}
                onCancel={handleSubCategoryAddCancel}
                footer={[
                    <Button key="back" onClick={handleSubCategoryAddCancel}>
                        Ləğv et
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddSubCategory}>
                        Əlavə et
                    </Button>,
                ]}
            >
                <Form form={subCategoryForm} layout="vertical">
                    <Form.Item
                        label="Alt Kateqoriya adı"
                        name="name"
                        rules={[{ required: true, message: 'Zəhmət olmasa alt kateqoriya adını daxil edin!' }]}
                    >
                        <Input placeholder="Alt kateqoriya adını daxil edin" />
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default CategoriesPanel;
