import './index.scss'
import ProfileForm from "../../components/ProfileForm/index.jsx";
import {Helmet} from "react-helmet-async";

function ProfilePage() {
    return (
        <section id={"profilePage"}>
            <Helmet>
                <title>Profil</title>
            </Helmet>
            <ProfileForm/>
        </section>
    );
}

export default ProfilePage;