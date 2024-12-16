import './index.scss';
import { Table, Modal, Form, Input, Button } from 'antd';
import {
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isSubCategoriesModalVisible, setIsSubCategoriesModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleEditCancel = () => setIsEditModalVisible(false);
    const handleSubCategoriesCancel = () => setIsSubCategoriesModalVisible(false);

    const handleAddCategory = async () => {
        try {
            const values = await form.validateFields();
            const response = await postNewCategory(values).unwrap();

            if (response?.statusCode === 200) {
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
            const response = await putCategory({ id: editingCategory.id, ...values }).unwrap();

            if (response?.statusCode === 200) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Kateqoriya redaktə olundu.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
                setIsEditModalVisible(false);
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

    const subCategoryColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Alt Kateqoriya Adı',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Əməliyyatlar',
            key: 'actions',
            render: (text, record) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                    <FaRegEdit
                        className="iconcate iconcateyel"
                        onClick={() => {
                            // TODO: Alt kateqoriya redaktə funksiyası
                            Swal.fire('Redaktə', 'Alt kateqoriya redaktə olunacaq.', 'info');
                        }}
                    />
                    <FaRegTrashAlt
                        className="iconcate iconcatered"
                        onClick={() => {
                            Swal.fire({
                                title: 'Əminsiniz?',
                                text: 'Bu alt kateqoriyanı silmək istədiyinizə əminsiniz?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Bəli, sil!',
                                cancelButtonText: 'Xeyr, ləğv et',
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    // TODO: Alt kateqoriya silmə funksiyası
                                    Swal.fire(
                                        'Silindi!',
                                        'Alt kateqoriya uğurla silindi.',
                                        'success'
                                    );
                                }
                            });
                        }}
                    />
                </div>
            ),
        },
    ];

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
                    style={{ cursor: 'pointer', color: 'blue' }}
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
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
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
                                    // TODO: Kateqoriya silmə funksiyası
                                    Swal.fire(
                                        'Silindi!',
                                        'Kateqoriya uğurla silindi.',
                                        'success'
                                    );
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
            >
                <Table
                    columns={subCategoryColumns}
                    dataSource={selectedCategory?.subCategories || []}
                    rowKey={(record) => record.id}
                />
            </Modal>
        </section>
    );
}

export default CategoriesPanel;
