import './index.scss';
import {FaChevronUp} from "react-icons/fa";

function GoTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scroll
        });
    };

    return (
        <div className={"container"}>
            <section id="goTop" onClick={scrollToTop}>
                <FaChevronUp/>
            </section>
        </div>
    );
}

export default GoTop;
