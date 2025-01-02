import './index.scss'
import RegisterForm from "../../components/RegisterForm/index.jsx";
import {Helmet} from "react-helmet-async";

function RegisterPage() {
    return (
        <section id={"registerPage"}>
            <Helmet>
                <title>Qeydiyyat</title>
            </Helmet>
            <RegisterForm/>
        </section>
    );
}

export default RegisterPage;