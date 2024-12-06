import './index.scss'

function About() {
    return (
        <section id={"about"}>
            <div className="container">
                <h2 className={"h2"}>About</h2>
                <p className={"p"}>Home Page / About</p>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <h2>About us</h2>
                        <p>Şirkətimiz, ofisinizin gündəlik təchizatı üçün zəruri olan dəftərxana ləvazimatlarının, su,
                            çay, kofe kimi daimi istifadə edilən qida məhsullarının, gigiyena və təmizlik vasitələrinin,
                            daşınan və daşınmaz hər növ inventarın (ofis mebel dəstləri, kompyuter və onun yan
                            avadanlıqları) Sizə sürətli və maneəsiz çatdırılması xidmətini həyata keçirir.</p>
                    </div>
                    <div className={"col-6"}>Salam</div>
                </div>
            </div>
        </section>
    );
}

export default About;