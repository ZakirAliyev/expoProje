import './index.scss';
import {
    useDeleteRBannerMutation,
    useGetAllRBannersQuery,
    usePostCreateRBannerMutation
} from "../../services/usersApi.jsx";
import {Table, Modal, Upload, Form, message} from "antd";
import {baseURLBanner, baseURLRBanners} from "../../constants.js";
import React, {useState} from "react";
import {FiTrash} from "react-icons/fi";
import {PlusOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";

function RightBannerPanel() {
    const {data: bannersData, refetch} = useGetAllRBannersQuery();
    const banners = bannersData?.data;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [postCreateBanner] = usePostCreateRBannerMutation();
    const [deleteBanner] = useDeleteRBannerMutation();

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
            const response = await deleteBanner(id).unwrap();
            if (response?.statusCode === 200) {
                Swal.fire({
                    title: "Silindi!",
                    text: "Banner uğurla silindi.",
                    icon: "success",
                });
                refetch(); // Refresh the banners list
            } else {
                message.error("Banner silinərkən xəta baş verdi!");
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
            const response = await postCreateBanner(formData).unwrap();
            if (response?.statusCode === 201) {
                message.success("Banner uğurla əlavə edildi!");
                refetch(); // Refresh the banners list
                setIsModalVisible(false);
                setFileList([]);
            } else {
                message.error("Banner əlavə edilərkən xəta baş verdi!");
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
                            aspectRatio: '16 / 9',
                            height: '150px',
                            objectFit: 'cover',
                            padding: '0',
                            borderRadius: '10px',
                        }}
                        src={baseURLRBanners + record?.imageName}
                        alt="Product"
                    />
                </div>
            ),
        },
        {
            title: 'Əməliyyatlar',
            render: (_, record) => (
                <FiTrash
                    className={"iconBanner"}
                    onClick={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    return (
        <section id={"bannerPanel"}>
            <button className={"addButton111"} onClick={showModal}>
                Banner əlavə et
            </button>
            <Table
                columns={columns}
                dataSource={banners}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 3,
                }}
            />
            <Modal
                title="Yeni Banner Əlavə Et"
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

export default RightBannerPanel;
