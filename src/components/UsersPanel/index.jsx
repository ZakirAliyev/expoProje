import './index.scss'
import {useGetAllUsersQuery} from "../../services/usersApi.jsx";

function UsersPanel() {

    const {data: getAllUsers} = useGetAllUsersQuery()
    const users = getAllUsers?.data

    return (
        <section id={"usersPanel"}>
            UsersPanel
        </section>
    );
}

export default UsersPanel;