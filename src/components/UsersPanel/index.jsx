import './index.scss';
import {useState} from 'react';
import {useGetAllUsersQuery} from "../../services/usersApi.jsx";
import {Table, Input} from "antd";

function UsersPanel() {
    const {data: getAllUsers} = useGetAllUsersQuery();
    const users = getAllUsers?.data;

    const [searchText, setSearchText] = useState("");

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    // Filtered data based on search text
    const filteredUsers = users?.filter((user) =>
        user.userName.toLowerCase().includes(searchText) ||
        user.fullName.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.companyName.toLowerCase().includes(searchText) ||
        user.address.toLowerCase().includes(searchText) ||
        user.phoneNumber.toLowerCase().includes(searchText)
    );

    const columns = [
        {
            title: 'İstifadəçi adı',
            dataIndex: 'userName',
        },
        {
            title: 'Ad soyad',
            dataIndex: 'fullName',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
        },
        {
            title: 'Şirkət adı',
            dataIndex: 'companyName',
        },
        {
            title: 'Ünvan',
            dataIndex: 'address',
        },
        {
            title: 'Mobil nömrə',
            dataIndex: 'phoneNumber',
        },
    ];

    return (
        <section id={"usersPanel"}>
            <Input
                placeholder="Axtarış..."
                onChange={handleSearch}
                style={{marginBottom: 16, width: '400px'}}
            />
            <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey={(record) => record.id} // Ensure each row has a unique key
            />
        </section>
    );
}

export default UsersPanel;
