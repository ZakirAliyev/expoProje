import './index.scss';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useGetUserDetailsQuery, usePostUserRegisterMutation} from "../../services/usersApi.jsx";
import Swal from "sweetalert2";
import {useState, useEffect} from "react";
import {ThreeCircles} from "react-loader-spinner";

function ProfileForm() {
    const [postUserRegister] = usePostUserRegisterMutation();
    const [loading, setLoading] = useState(false);
    const {data: getUserData} = useGetUserDetailsQuery();
    const user = getUserData?.data;

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
                    resetForm();
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
        validationSchema: SignupSchema,
    });

    // Kullanıcı detaylarını forma yerleştirmek için useEffect
    useEffect(() => {
        if (user) {
            formik.setValues({
                userName: user.userName || '',
                fullName: user.fullName || '',
                companyName: user.companyName || '',
                email: user.email || '',
                password: '', // Şifre boş olaraq saxlanılır
                confirmPassword: '', // Təkrar şifrə boş saxlanılır
                address: user.address || '',
                phoneNumber: user.phoneNumber || '',
            });
        }
    }, [user]);

    return (
        <section id="profileForm">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Şəxsi kabinet</h2>
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
                            </div>
                            <div className="button">
                                <button type="submit">
                                    {!loading ? 'Saxla' : <ThreeCircles color={'#454545'} height={'25'}/>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileForm;
