import './index.scss';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { usePostUserRegisterMutation } from "../../services/usersApi.jsx";
import Swal from "sweetalert2";

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
            .max(50, "Şirkət adı maksimum 50 simvol ola bilər")
            .required("Şirkət adı tələb olunur"),
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
        phoneNumber: Yup.string()
            .min(9, "Telefon nömrəsi minimum 9 simvol olamalıdır")
            .max(15, "Telefon nömrəsi maksimum 15 simvol ola bilər")
            .required("Telefon nömrəsi tələb olunur"),
    });

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
        onSubmit: async (values) => {
            try {
                const response = await postUserRegister(values).unwrap();

                if (response?.statusCode === 201) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User registered successfully! Please check your mail.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.log(error)
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error?.data?.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
        validationSchema: SignupSchema,
    });

    return (
        <section id="registerForm">
            <div className="container">
                <h2>Register</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <input
                                placeholder="Company name"
                                name="companyName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.companyName}
                            />
                            {formik.touched.companyName && formik.errors.companyName && (
                                <div className="error">{formik.errors.companyName}</div>
                            )}
                        </div>
                        <div className="col-6">
                            <input
                                placeholder="Full Name"
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
                        <div className="col-6">
                            <input
                                placeholder="Address"
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                            {formik.touched.address && formik.errors.address && (
                                <div className="error">{formik.errors.address}</div>
                            )}
                        </div>
                        <div className="col-6">
                            <input
                                placeholder="E-mail"
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
                        <div className="col-6">
                            <input
                                placeholder="Password"
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
                        <div className="col-6">
                            <input
                                placeholder="Confirm Password"
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
                        <div className="col-6">
                            <input
                                placeholder="Phone Number"
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="error">{formik.errors.phoneNumber}</div>
                            )}
                        </div>
                        <div className="col-6">
                            <input
                                placeholder="Username"
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
    );
}

export default RegisterForm;
