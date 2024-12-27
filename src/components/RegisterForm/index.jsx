import './index.scss';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {usePostUserRegisterMutation} from "../../services/usersApi.jsx";
import Swal from "sweetalert2";
import {useState} from "react";
import {ThreeCircles} from "react-loader-spinner";
import expo from '/src/assets/logo.png'
import {Link} from "react-router";

function RegisterForm() {
    const [postUserRegister] = usePostUserRegisterMutation();

    const SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .min(3, "İstifadəçi adı minimum 3 simvoldan ibarət olmalıdır")
            .max(15, "İstifadəçi adı maksimum 15 simvol ola bilər")
            .required("İstifadəçi adı tələb olunur"),
        fullName: Yup.string()
            .min(3, "Tam ad minimum 3 simvoldan ibarət olmalıdır")
            .max(50, "Tam ad maksimum 50 simvol ola bilər")
            .required("Tam ad tələb olunur"),
        companyName: Yup.string()
            .min(3, "Şirkət adı minimum 3 simvoldan ibarət olmalıdır")
            .max(50, "Şirkət adı maksimum 50 simvol ola bilər"),
        email: Yup.string()
            .email("Düzgün e-poçt daxil edin")
            .required("E-poçt tələb olunur"),
        password: Yup.string()
            .min(8, "Şifrə minimum 8 simvoldan ibarət olmalıdır")
            .max(20, "Şifrə maksimum 20 simvol ola bilər")
            .matches(/[A-Z]/, "Şifrə ən az bir böyük hərf ehtiva etməlidir")
            .matches(/[a-z]/, "Şifrə ən az bir kiçik hərf ehtiva etməlidir")
            .matches(/\d/, "Şifrə ən az bir rəqəm ehtiva etməlidir")
            .matches(/[!@#$%^&*(),.?":{}|<>_\-;`~]/, "Şifrə ən az bir xüsusi simvol ehtiva etməlidir")
            .required("Şifrə tələb olunur"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Şifrələr eyni olmalıdır")
            .required("Şifrə təsdiqi tələb olunur"),
        address: Yup.string()
            .max(200, "Adres maksimum 200 simvol ola bilər")
            .required("Adres tələb olunur"),
        phoneNumber: Yup.number()
            .min(9, "Telefon nömrəsi minimum 9 simvol olamalıdır")
            .max(15, "Telefon nömrəsi maksimum 15 simvol ola bilər")
            .required("Telefon nömrəsi tələb olunur"),
    });

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            userName: '',
            fullName: '',
            companyName: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
        },
        onSubmit: async (values, {resetForm}) => {
            try {
                setLoading(true);
                const response = await postUserRegister(values).unwrap();

                if (response?.statusCode === 201) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User registered successfully! Please check your mail.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm()
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
            setLoading(false)
        },
        validationSchema: SignupSchema,
    });

    return (
        <section id="registerForm">
            <div className="container">
                <div className={"row row1"}>
                    <div className={"col-3 col-md-3 col-sm-12 col-xs-12 coll"}>
                        <img className={"logo"} src={expo} alt={"Image"}/>
                        <div className={"wrapper"}>
                            <div className={"textWrapper"}>
                                <p>Hesabınız</p>
                                <p>varmı?</p>
                            </div>
                            <Link to={`/login`}>
                                <button className={"butt"}>Daxil ol</button>
                            </Link>
                        </div>
                    </div>
                    <div className={"col-9 col-md-9 col-sm-12 col-xs-12"}>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Qeydiyyat</h2>
                            <div className="row">
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="Şirkət adı"
                                        name="companyName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.companyName}
                                    />
                                    {formik.touched.companyName && formik.errors.companyName && (
                                        <div className="error">{formik.errors.companyName}</div>
                                    )}
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="Ad və soyad"
                                        name="fullName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullName}
                                    />
                                    {formik.touched.fullName && formik.errors.fullName && (
                                        <div className="error">{formik.errors.fullName}</div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="Ünvan"
                                        name="address"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                    />
                                    {formik.touched.address && formik.errors.address && (
                                        <div className="error">{formik.errors.address}</div>
                                    )}
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="E-poçt ünvanı"
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="error">{formik.errors.email}</div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="Şifrə"
                                        type="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="error">{formik.errors.password}</div>
                                    )}
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="Şifrə təkrarı"
                                        type="password"
                                        name="confirmPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <div className="error">{formik.errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="Telefon"
                                        name="phoneNumber"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                        <div className="error">{formik.errors.phoneNumber}</div>
                                    )}
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 col-xs-12">
                                    <input
                                        placeholder="İstifadəçi adı"
                                        name="userName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.userName}
                                    />
                                    {formik.touched.userName && formik.errors.userName && (
                                        <div className="error">{formik.errors.userName}</div>
                                    )}
                                </div>
                            </div>
                            <div className={"button"}>
                                <button type="submit">
                                    {!loading ? 'Təstiq et' :
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

export default RegisterForm;
