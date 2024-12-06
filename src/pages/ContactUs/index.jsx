import './index.scss'

function ContactUs() {
    return (
        <section id={"contactUs"}>
            <div className={"container"}>
                <h2>Contact us</h2>
                <p>Home Page / Contact us</p>
                <div className={"row"}>
                    <div className={"box col-4"}>Section 1</div>
                    <div className={"box col-4"}>Section 2</div>
                    <div className={"box col-4"}>Section 3</div>
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d759.8292178521255!2d49.84850038794004!3d40.379669215083226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0a3ea7028d%3A0xac9d73dbd66392c8!2s28%20May!5e0!3m2!1str!2saz!4v1733343820476!5m2!1str!2saz"
                            style={{
                            border: 0
                        }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={"col-6"}>
                        <form>
                            <h2>Application Form</h2>
                            <input placeholder={"Name, surname"}/>
                            <input placeholder={"Title"}/>
                            <input placeholder={"E-mail"}/>
                            <textarea
                                placeholder={"Message"}
                                rows={5}
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