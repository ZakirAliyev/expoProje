import './index.scss'
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {usePostForgotPasswordMutation, usePostUserLoginMutation} from "../../services/usersApi.jsx";
import expo from "../../assets/logo.png";
import {Link} from "react-router";
import {ThreeCircles} from "react-loader-spinner";
import {useState} from "react";
import {Helmet} from "react-helmet-async";

function ForgotPassword() {

    const [postForgotPassword] = usePostForgotPasswordMutation()

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Düzgün e-poçt daxil edin")
            .required("E-poçt tələb olunur"),
    });

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async (values, {resetForm}) => {
            try {
                setLoading(true);
                const response = await postForgotPassword(values).unwrap();

                if (response?.statusCode === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Elektron poçt ünvanınızı yoxlayın!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm()
                }
            } catch (error) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xəta baş verdi!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            setLoading(false);
        },
        validationSchema: SignupSchema
    });

    return (
        <section id={"forgotPassword"}>
            <Helmet>
                <title>Parolunu unutmusan?</title>
            </Helmet>
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
                            <h2>Parolunu unutmusan?</h2>
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
                            </div>
                            <p>E-poçt ünvanınızı yazın düyməni basın və təsdiq linkini əldə edin</p>
                            <div className={"button"}>
                                <button type="submit">
                                    {!loading ? 'Linki əldə et' :
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

export default ForgotPassword;