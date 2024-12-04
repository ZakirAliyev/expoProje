import './index.scss'
import {useFormik} from "formik";

function RegisterForm() {

    const formik = useFormik({
        initialValues: {
            companyName: '',
            fullName: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <section id={"registerForm"}>
            <div className={"container"}>
                <h2>Register</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"Company name"}
                                name="companyName"
                                onChange={formik.handleChange}
                                value={formik.values.companyName}
                            />
                        </div>
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"Fullname"}
                                name="fullName"
                                onChange={formik.handleChange}
                                value={formik.values.fullname}
                            />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"Address"}
                                name="address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                        </div>
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
                    </div>
                    <div className={"row"}>
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
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"Confirm password"}
                                type={"password"}
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <input
                                required
                                placeholder={"Phone number"}
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                            />
                        </div>
                    </div>
                    <button type={"submit"}>Register</button>
                </form>
            </div>
        </section>
    );
}

export default RegisterForm;