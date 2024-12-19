import './index.scss'
import {useFormik} from 'formik';
import {BsFillTelephoneFill} from "react-icons/bs";
import {IoMdMail} from "react-icons/io";
import {MdLocationOn} from "react-icons/md";
import {usePostContactSendMutation} from "../../services/usersApi.jsx";
import Swal from "sweetalert2";

function ContactUs() {

    const [postContactSend] = usePostContactSendMutation()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            title: '',
            email: '',
            message: '',
        },
        onSubmit: async (values, {resetForm}) => {
            try {
                const response = await postContactSend(values).unwrap()

                if (response?.statusCode === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Mesaj göndərildi!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm()
                }
            } catch (error) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xəta baş verdi!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    });

    return (
        <section id={"contactUs"}>
            <div className={"container"}>
                <h2 className={"h2h2"}>Contact us</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                <p>Home Page / Contact us</p>
                <div className={"row"} style={{
                    marginTop: '50px'
                }}>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            <BsFillTelephoneFill className={"icon"}/>
                            <div>
                                <a href={"tel:+994557519845"}>
                                    +994 (55) 751-98-45
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            <IoMdMail className={"icon"}/>
                            <div>
                                <a href={"mailto:info@expohome.az"}>
                                    info@expohome.az
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            <MdLocationOn className={"icon"}/>
                            <div>
                                <a href={"https://maps.app.goo.gl/o6HjCBSgFgZLt1sh7"} target={"_blank"}>
                                    46B Aşıq Molla Cümə, Bakı 1000
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{
                    marginTop: '20px'
                }}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Application Form</h2>
                            <input
                                required
                                placeholder={"Name, surname *"}
                                name={"fullName"}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <input
                                required
                                placeholder={"Title *"}
                                name={"title"}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <input
                                required
                                type="email"
                                placeholder={"E-mail *"}
                                name={"email"}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <textarea
                                required
                                placeholder={"Message *"}
                                name={"message"}
                                rows={5}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <button type={"submit"}>Send</button>
                        </form>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.8437328221657!2d49.8547375766896!3d40.41231247144035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030870062b197d3%3A0x8360330b9e20b740!2sExpoHome%20by%20AK%C4%B0AB!5e0!3m2!1str!2saz!4v1734123179382!5m2!1str!2saz"
                            style={{border: 0}} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;