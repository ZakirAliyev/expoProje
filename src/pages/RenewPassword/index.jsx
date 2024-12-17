import './index.scss';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { usePostResetPasswordMutation } from "../../services/usersApi.jsx";
import expo from "../../assets/logo.png";
import { Link } from "react-router";
import { ThreeCircles } from "react-loader-spinner";

function RenewPassword() {
    const [postResetPassword] = usePostResetPasswordMutation();
    const [loading, setLoading] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    const SignupSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, "Şifrə minimum 8 simvoldan ibarət olmalıdır")
            .max(20, "Şifrə maksimum 20 simvol ola bilər")
            .matches(/[A-Z]/, "Şifrə ən az bir böyük hərf ehtiva etməlidir")
            .matches(/[a-z]/, "Şifrə ən az bir kiçik hərf ehtiva etməlidir")
            .matches(/\d/, "Şifrə ən az bir rəqəm ehtiva etməlidir")
            .matches(/[!@#$%^&*(),.?":{}|<>_\-;`~]/, "Şifrə ən az bir xüsusi simvol ehtiva etməlidir")
            .required("Şifrə tələb olunur"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Şifrələr eyni olmalıdır")
            .required("Şifrə təsdiqi tələb olunur"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            token: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await postResetPassword(values).unwrap();

                if (response?.statusCode === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Şifrə uğurla yeniləndi",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm();
                }
            } catch (error) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error?.data?.message || "Xəta baş verdi",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            setLoading(false);
        },
        validationSchema: SignupSchema
    });

    useEffect(() => {
        if (email && token) {
            formik.setValues({
                ...formik.values,
                email,
                token,
            });
        }
    }, [email, token]);

    return (
        <section id={"forgotPassword"}>
            <div className="container">
                <div className={"row row1"}>
                    <div className={"col-3 col-md-3 col-sm-12 col-xs-12 coll"}>
                        <img className={"logo"} src={expo} alt={"Image"} />
                        <div className={"wrapper"}>
                            <div className={"textWrapper"}>
                                <p>Hesabınız</p>
                                <p>yoxdur?</p>
                            </div>
                            <Link to={`/register`}>
                                <button className={"butt"}>Qeydiyyat</button>
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
                                        placeholder={"Şifrəni daxil et"}
                                        type={"password"}
                                        name="newPassword"
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword}
                                    />
                                </div>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <input
                                        required
                                        placeholder={"Şifrəni yenidən daxil et"}
                                        type={"password"}
                                        name="confirmPassword"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className={"button"}>
                                <button type="submit">
                                    {!loading ? 'Şifrəni yenilə' :
                                        <ThreeCircles className={"buttonColor"} color={'#454545'} height={'25'} />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RenewPassword;
