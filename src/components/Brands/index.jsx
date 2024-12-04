import './index.scss'

function Brands() {
    return (
        <section id={"brands"}>
            <div className={"container"}>
                <h2>Brands</h2>
                <div className={"row"}>
                    <div className={"box col-3"}>Section 1</div>
                    <div className={"box col-3"}>Section 2</div>
                    <div className={"box col-3"}>Section 3</div>
                    <div className={"box col-3"}>Section 4</div>
                </div>
            </div>
        </section>
    );
}

export default Brands;