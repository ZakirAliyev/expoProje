import './index.scss';
import {Helmet} from "react-helmet-async";

function ErrorPage() {
    return (
        <section id="errorPage">
            <Helmet>
                <title>Səhifə tapılmadı - 404</title>
            </Helmet>
            <div className={"container"}>
                <h2>404</h2>
                <p>Səhifə tapılmadı!</p>
                <button className={"addButton111"}>
                    Ana səhifəyə qayıt
                </button>
            </div>
        </section>
    );
}

export default ErrorPage;
