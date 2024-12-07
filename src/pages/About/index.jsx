import './index.scss'
import lucky from "/src/assets/lucky.jpeg"

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
                            avadanlıqları) Sizə sürətli və maneəsiz çatdırılması xidmətini həyata keçirir.
                        </p>
                        <p>
                            Xidmətlərimizdən istifadə etməklə Siz;
                        </p>
                        <ul>
                            <li>vaxtınıza qənaət etmiş olursunuz,</li>
                            <li>
                                sifariş etmədən öncə qiymətlərlə tanış ola, qiymət müqaisəsini rahatlıqla edə
                                bilirsiniz,
                            </li>
                            <li>
                                sifarişlərinizi həm nəğd, həm də köçürmə yolu ilə həyata keçirə bilirsiniz,
                            </li>
                            <li>
                                əməkdaşlarınızın ancaq işlərinə vaxt sərf etməsinə zəmin yaradırsınız,
                            </li>
                            <li>
                                əlavə xərclərdən (taksi, park yeri, park cərimələri və s.) azad olursunuz.
                            </li>
                        </ul>
                        <p>
                            Bizimlə əməkdaşlıq etdiyiniz təqdirdə, bütün xidmətlərin yüksək sürət və həssasiyyətlə
                            həyata keçiriləcəyinə təminat veririk.
                        </p>
                    </div>
                    <div className={"col-6 box"}>
                        <img src={lucky} alt={"Image"}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;