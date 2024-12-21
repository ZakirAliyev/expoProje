import './index.scss';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    useGetUserDetailsQuery,
    usePostUserUpdateMutation
} from "../../services/usersApi.jsx";
import Swal from "sweetalert2";
import {useState, useEffect} from "react";
import {ThreeCircles} from "react-loader-spinner";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function ProfileForm() {
    const [postUserRegister] = usePostUserUpdateMutation();
    const [loading, setLoading] = useState(false);
    const {data: getUserData, refetch: refetchUser} = useGetUserDetailsQuery();
    const user = getUserData?.data;

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(3, "Tam ad minimum 3 simvoldan ibarət olmalıdır")
            .max(50, "Tam ad maksimum 50 simvol ola bilər")
            .required("Tam ad tələb olunur"),
        companyName: Yup.string()
            .min(3, "Şirkət adı minimum 3 simvoldan ibarət olmalıdır")
            .max(50, "Şirkət adı maksimum 50 simvol ola bilər")
            .required("Şirkət adı tələb olunur"),
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
            fullName: '',
            companyName: '',
            address: '',
            phoneNumber: '',
        },
        onSubmit: async (values, {resetForm}) => {
            try {
                setLoading(true);
                const response = await postUserRegister(values).unwrap();

                if (response?.statusCode === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Məlumatlar dəyişdirildi!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm();
                }

                refetchUser()
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

    useEffect(() => {
        if (user) {
            formik.setValues({
                fullName: user.fullName || '',
                companyName: user.companyName || '',
                address: user.address || '',
                phoneNumber: user.phoneNumber || '',
            });
        }
    }, [user]);

    const navigate = useNavigate()

    return (
        <section id="profileForm">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0 16px'
                            }}>
                                <h2>Şəxsi kabinet</h2>
                                <div className={"btntbn"} style={{
                                    backgroundColor: '#0DA5B5',
                                    color: 'white',
                                    border: '1px solid white',
                                    height: '40px',
                                    padding: '0 16px',
                                    fontSize: '20px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all .2s ease'
                                }} onClick={() => {
                                    Cookies.set("expoToken", "null");
                                    navigate('/');
                                }}>
                                    Çıxış
                                </div>
                            </div>
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
