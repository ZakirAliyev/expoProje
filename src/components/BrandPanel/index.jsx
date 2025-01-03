import './index.scss';
import {Table, Modal, Upload, Form, message} from "antd";
import {baseURLBrand} from "../../constants.js";
import React, {useState} from "react";
import {FiTrash} from "react-icons/fi";
import {PlusOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";
import {useDeleteBrandMutation, useGetAllBrandsQuery, usePostCreateBrandMutation} from "../../services/usersApi.jsx";

function BrandPanel() {
    const {data: brandsData, refetch} = useGetAllBrandsQuery();
    const brands = brandsData?.data;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [postCreateBrand] = usePostCreateBrandMutation();
    const [deleteBrand] = useDeleteBrandMutation();

    const showModal = () => setIsModalVisible(true);

    const handleCancel = () => {
        setIsModalVisible(false);
        setFileList([]);
    };

    const handleUploadChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteBrand(id).unwrap();
            if (response?.statusCode === 200) {
                Swal.fire({
                    title: "Silindi!",
                    text: "Brand uğurla silindi.",
                    icon: "success",
                });
                refetch();
            } else {
                message.error("Brand silinərkən xəta baş verdi!");
            }
        } catch (error) {
            message.error("Xəta baş verdi: " + error.message);
        }
    };

    const handleAdd = async () => {
        if (fileList.length === 0) {
            message.error("Ən az bir şəkil əlavə edin!");
            return;
        }

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("file", file.originFileObj);
        });

        try {
            const response = await postCreateBrand(formData).unwrap();
            if (response?.statusCode === 201) {
                message.success("Brand uğurla əlavə edildi!");
                refetch();
                setIsModalVisible(false);
                setFileList([]);
            } else {
                message.error("Brand əlavə edilərkən xəta baş verdi!");
            }
        } catch (error) {
            message.error("Xəta baş verdi: " + error.message);
        }
    };

    const uploadProps = {
        onRemove: (file) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        },
        beforeUpload: (file) => {
            setFileList((prevList) => [...prevList, file]);
            return false;
        },
        fileList,
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Image',
            render: (_, record) => (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        style={{
                            width: '200px',
                            objectFit: 'cover',
                            padding: '0',
                            borderRadius: '10px',
                        }}
                        src={baseURLBrand + record?.imageName}
                        alt="Product"
                    />
                </div>
            ),
        },
        {
            title: 'Əməliyyatlar',
            render: (_, record) => (
                <FiTrash
                    className={"iconBrand"}
                    onClick={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    return (
        <section id={"brandPanel"}>
            <button className={"addButton111"} onClick={showModal}>
                Brand əlavə et
            </button>
            <Table
                columns={columns}
                dataSource={brands}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 7,
                }}
            />
            <Modal
                title="Yeni Brand Əlavə Et"
                visible={isModalVisible}
                onOk={handleAdd}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item
                        label="Şəkillər"
                        rules={[{required: true, message: "Ən az bir şəkil əlavə edin!"}]}
                    >
                        <Upload {...uploadProps} listType="picture-card" onChange={handleUploadChange}>
                            {fileList.length < 1 && (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default BrandPanel;
