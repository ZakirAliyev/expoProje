import './index.scss'
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {usePostUserLoginMutation} from "../../services/usersApi.jsx";

function LoginForm() {

    const [postUserLogin] = usePostUserLoginMutation()

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Düzgün e-poçt daxil edin")
            .required("E-poçt tələb olunur"),
        password: Yup.string()
            .min(8, "Şifrə minimum 8 simvoldan ibarət olmalıdır")
            .max(20, "Şifrə maksimum 20 simvol ola bilər")
            .required("Şifrə tələb olunur"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await postUserLogin(values).unwrap();
                console.log(response)

                if (response?.statusCode === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "İstifadəçi uğurla giriş etdi",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error?.data?.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
        validationSchema: SignupSchema
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