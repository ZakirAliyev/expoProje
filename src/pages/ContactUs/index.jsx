import './index.scss'
import {useFormik} from 'formik';
import {BsFillTelephoneFill} from "react-icons/bs";
import {IoMdMail} from "react-icons/io";
import {MdLocationOn} from "react-icons/md";

function ContactUs() {

    const formik = useFormik({
        initialValues: {
            fullName: '',
            title: '',
            email: '',
            message: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <section id={"contactUs"}>
            <div className={"container"}>
                <h2>Contact us</h2>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin:'10px 0'
                }}>
                    <div className={"greenLine"}></div>
                </div>
                <p>Home Page / Contact us</p>
                <div className={"row"} style={{
                    marginTop: '50px'
                }}>
                    <div className={"col-4"}>
                        <div className={"box"}>
                            <BsFillTelephoneFill className={"icon"}/>
                            <div>(994) 99 832 07 77</div>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <div className={"box"}>
                            <IoMdMail className={"icon"}/>
                            <div>info@los.az</div>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <div className={"box"}>
                            <MdLocationOn className={"icon"}/>
                            <div>Xətai pr.2</div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{
                    marginTop: '20px'
                }}>
                    <div className={"col-6"}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d759.8292178521255!2d49.84850038794004!3d40.379669215083226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0a3ea7028d%3A0xac9d73dbd66392c8!2s28%20May!5e0!3m2!1str!2saz!4v1733343820476!5m2!1str!2saz"
                            style={{
                                border: 0
                            }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={"col-6"}>
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
                </div>
            </div>
        </section>
    );
}

export default ContactUs;