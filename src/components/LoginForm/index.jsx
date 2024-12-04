import './index.scss'
import {useFormik} from "formik";

function LoginForm() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <section id={"loginForm"}>
            <div className={"container"}>
                <h2>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"E-mail"}
                                type={"email"}
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"Password"}
                                type={"password"}
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                    </div>
                    <button type={"submit"}>Login</button>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;