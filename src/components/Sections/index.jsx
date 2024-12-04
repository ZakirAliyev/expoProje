import './index.scss'

function Sections() {
    return (
        <section id={"sections"}>
            <div className={"container"}>
                <h2>Sections</h2>
                <div className={"row"}>
                    <div className={"box col-4"}>Section 1</div>
                    <div className={"box col-4"}>Section 2</div>
                    <div className={"box col-4"}>Section 3</div>
                </div>
                <div className={"row"}>
                    <div className={"box col-4"}>Section 4</div>
                    <div className={"box col-4"}>Section 5</div>
                    <div className={"box col-4"}>Section 6</div>
                </div>
                <div className={"row"} style={{
                    marginTop: '100px'
                }}>
                    <div className={"box col-4"}>Section 7</div>
                    <div className={"box col-4"}>Section 8</div>
                    <div className={"box col-4"}>Section 9</div>
                </div>
                <div className={"row"}>
                    <div className={"box col-4"}>Section 10</div>
                    <div className={"box col-4"}>Section 5</div>
                    <div className={"box col-4"}>Section 6</div>
                </div>
            </div>
        </section>
    );
}

export default Sections;