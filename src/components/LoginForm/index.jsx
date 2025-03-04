import './index.scss'
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {useGetUserDetailsQuery, usePostUserLoginMutation} from "../../services/usersApi.jsx";
import expo from "../../assets/logo.png";
import {Link} from "react-router";
import {ThreeCircles} from "react-loader-spinner";
import {useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function LoginForm() {

    const [postUserLogin] = usePostUserLoginMutation()
    const {data: userDetails, refetch: userDetailsRefetch} = useGetUserDetailsQuery()
    const user = userDetails?.data

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Düzgün e-poçt daxil edin")
            .required("E-poçt tələb olunur"),
        password: Yup.string()
            .min(8, "Şifrə minimum 8 simvoldan ibarət olmalıdır")
            .max(20, "Şifrə maksimum 20 simvol ola bilər")
            .required("Şifrə tələb olunur"),
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await postUserLogin(values).unwrap();

                if (response?.statusCode === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "İstifadəçi uğurla giriş etdi",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/')
                    userDetailsRefetch()
                    Cookies.set('expoToken', response?.data?.token);
                    Cookies.set('expoRole', "User")
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
            setLoading(false);
        },
        validationSchema: SignupSchema
    });

    return (
        <section id={"loginForm"}>
            <div className="container">
                <div className={"row row1"}>
                    <div className={"col-3 col-md-3 col-sm-12 col-xs-12 coll"}>
                        <img className={"logo"} src={expo} alt={"Image"}/>
                        <div className={"wrapper"}>
                            <div className={"textWrapper"}>
                                <p>Hesabınız</p>
                                <p>yoxdur?</p>
                            </div>
                            <Link to={`/register`}>
                                <button className={"butt"}>
                                    Qeydiyyat
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className={"col-9 col-md-9 col-sm-12 col-xs-12"}>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Daxil ol</h2>
                            <div className={"row"}>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <input
                                        required
                                        placeholder={"E-mail"}
                                        type={"email"}
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                </div>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <input
                                        required
                                        placeholder={"Şifrə"}
                                        type={"password"}
                                        name="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                </div>
                                <Link className={"link"} to={`/forgot-password`}>Şifrəni unutmusan?</Link>
                            </div>
                            <div className={"button"}>
                                <button type="submit">
                                    {!loading ? 'Daxil ol' :
                                        <ThreeCircles className={"buttonColor"} color={'#454545'} height={'25'}/>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;