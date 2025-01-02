import './index.scss'
import LoginForm from "../../components/LoginForm/index.jsx";
import {Helmet} from "react-helmet-async";

function LoginPage() {
    return (
        <section id={"loginPage"}>
            <Helmet>
                <title>Giriş</title>
            </Helmet>
            <LoginForm/>
        </section>
    );
}

export default LoginPage;