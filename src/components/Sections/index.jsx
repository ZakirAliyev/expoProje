import './index.scss';
import {useGetAllCategoriesTreeQuery, useGetAllProductsQuery} from "../../services/usersApi.jsx";

function Sections() {
    const {data: categoriesData} = useGetAllCategoriesTreeQuery();
    const {data: productsData} = useGetAllProductsQuery();

    const categories = categoriesData?.data;
    const products = productsData?.data;

    return (
        <section id="sections">
            <div className="container">
                <h2>Categories</h2>
                <div className="row">
                    {categories && categories.map((item) => (
                        <div className="box col-4" key={item.id}>
                            {item.name}
                        </div>
                    ))}
                </div>
                <h2>Products</h2>
                <div className="row">
                    {products && products.map((item) => (
                        <div className="box1 col-4" key={item.id}>
                            <img src={"https://exposite-001-site1.ntempurl.com/files/pictures/" + item.images[0]}
                                 alt={"Image"}/>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Sections;
