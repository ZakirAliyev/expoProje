import './index.scss'
import {useGetAllUsersQuery} from "../../services/usersApi.jsx";
import {Table} from "antd";

function UsersPanel() {

    const {data: getAllUsers} = useGetAllUsersQuery()
    const users = getAllUsers?.data

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
    ]

    return (
        <section id={"usersPanel"}>
            <Table
                columns={columns}
                dataSource={users}
            />
        </section>
    );
}

export default UsersPanel;