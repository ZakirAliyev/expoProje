import './index.scss'
import car from "/src/assets/car.png"
import terms1 from "/src/assets/terms1.png"

function Terms() {
    return (
        <section id={"terms"}>
            <div className="container">
                <h2 className={"h2"}>Qaydalar</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                <p className={"p"}>Ana səhifə / Qaydalar</p>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>Çatdırılma</h2>
                        <p>
                            Çatdırılma qiymətləri:
                            Çatdırılma, 60 azn və üzəri sifarişlərdə ödənişsizdir.
                            60 azn-ə qədər olan sifarişlərdə çatdırılma 5 azn nəzərdə tutulmuşdur
                        </p>
                        <p>
                            Çatdırılma müddəti:
                            Həftənin 5 günü iş saatları (09.00 – 18.00) ərzində çatdırılma mövcuddur. Çatdırılma,
                            sifariş verdiyiniz günün ertəsi günü təmin ediləcəkdir. Şənbə günü verdiyiniz sifarişlər
                            növbəti həftənin ilk iş günü ərzində çatdırılacaqdır.
                        </p>
                        <p>
                            Sifarişlə gətirilən məhsulların çatdırılma şərtləri
                            Sifarişlə gətirilən məhsulların çatdırılma müddəti və şərtlərini dəqiqləşdirmək üçün müştəri
                            xidmətləri ilə əlaqə saxlamağınız xahiş olunur.
                        </p>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12 box"}>
                        <img
                            src={car}
                            alt={"Image"}
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>Geri qaytarilma</h2>
                        <p>
                            Lucky Office Support-dan alınan malların dəyişdirilməsi və ya geri qaytarılması qaydaları
                            aşağıdakı göstərilmiş:
                        </p>
                        <ul>
                            <li>
                                Geri qaytarılması qadağan olunan mallar istisna olmaqla bütün mallar Azərbaycan
                                Respublikasının İstehlakçıların hüquqlarının müdafiəsi haqqında qanunun 15-ci maddəsində
                                qeyd edilən şərtlərlə 14 gün ərzində geri qaytarıla bilər.
                            </li>
                            <li>
                                Mal təhvil alınan zaman mütləq şəkildə fiziki xüsusiyyətləri, funksionallıqları
                                yoxlanmalıdır, əgər hər hansı irad varsa yerində çatdırılmanı edən əməkdaşımıza
                                bildirilməlidir,
                            </li>
                            <li>
                                Malın qutusu (əgər qutuda olan maldırsa) açılıbsa,
                            </li>
                            <li>
                                Mal istifadə edilmişdirsə,
                            </li>
                            <li>
                                Malın əmtəə görünüşü, istehlak xüsusiyyətləri və fiziki göstəricilərdə defarmasiya
                                olubsa,
                            </li>
                            <li>
                                Alış və çatıdırılma zamanı təqdim olunan sənəd (elektron və ya adi sənəd)
                                saxlanıbsa,
                            </li>
                            <li>
                                AR-nın NK-nin müvafiq qərarında siyahı halında dəyişidirilməsi/geri qaytarılması
                                edilməyən mallardan deyilsə,
                            </li>
                            <li>
                                Geri qaytarılma və dəyişdirilmə ancaq istehsal xətasına görə olan qüsurdursa və ya
                                bu qüsur təhvil təslim zamanı ortaya çıxmışdırsa bu zaman geri qaytarma/dəyişdirmə
                                icra edilir.
                            </li>
                            <li>
                                Mal qaytarılan/dəyişdirilən zaman qablaşdırması, alış sənədləri və aksesuarları
                                (akseasuarları olan maldırsa) ilə birlikdə verilməlidir.
                            </li>
                        </ul>
                        <p>
                            Aşağıdakı malların geri qaytarılması həyata keçirilmir:
                        </p>
                        <ul>
                            <li>
                                Məktəb, hədiyyəlik, hobbi, ev əşyası və digər fərdi istifadə malları
                            </li>
                            <li>
                                Dəri məmulatları
                            </li>
                            <li>
                                Bütün növ Gigiyena məhsulları
                            </li>
                            <li>
                                Sifariş əsasında şəxsə özəl olaraq hazırlanmış məhsullar
                            </li>
                            <li>
                                Hissələrdən ibarət olaraq anbarda saxlanılan və müştərinin istəyi ilə montaj edilərək
                                müştərinin ofisinə çatdırlan mallar (dəmir dolablar, mebellər və s.)
                            </li>
                            <li>
                                Seyf və digər bu tipdə kassa və mühafizə məqsədli mallar.
                            </li>
                        </ul>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12 box"}>
                        <img
                            src={terms1}
                            alt={"Image"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Terms;