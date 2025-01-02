import './index.scss';
import ProductCard from "../../components/ProductCard/index.jsx";
import {useGetAllProductsQuery} from "../../services/usersApi.jsx";
import AnyLoading from "../../components/AnyLoading/index.jsx";
import Pagination from "../../components/Pagination/index.jsx";
import { useState } from "react";
import {Helmet} from "react-helmet-async";

function NewProducts() {
    const { data: productsData, isLoading: productLoading } = useGetAllProductsQuery();
    const products = productsData?.data || [];
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section id={"newProducts"}>
            <Helmet>
                <title>Yeni məhsullar</title>
            </Helmet>
            <div className={"container"}>
                <h2>Yeni məhsullar</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                {productLoading && <AnyLoading />}
                <div className={"row"}>
                    {currentProducts.map((product) => (
                        <div className={"col-3 col-md-6 col-sm-12 col-xs-12"} key={product.id}>
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>
                <Pagination
                    totalItems={products.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
}

export default NewProducts;
