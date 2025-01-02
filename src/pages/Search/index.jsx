import './index.scss';
import {useLocation} from "react-router-dom";
import {useGetAllProductByNameQuery} from "../../services/usersApi.jsx";
import ProductCard from "../../components/ProductCard/index.jsx";
import AnyLoading from "../../components/AnyLoading/index.jsx";
import Pagination from "../../components/Pagination/index.jsx";
import { useState } from "react";
import {Helmet} from "react-helmet-async";

function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const { data: getAllProductByName, isLoading } = useGetAllProductByNameQuery(query);
    const products = getAllProductByName?.data || [];
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section id={"search"}>
            <Helmet>
                <title>Axtar</title>
            </Helmet>
            <div className={"container"}>
                <h2>Axtarış</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                {isLoading && <AnyLoading />}
                <div className={"row"}>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div className={"col-3 col-md-3 col-sm-6 col-xs-12"} key={product.id}>
                                <ProductCard item={product} query={query} />
                            </div>
                        ))
                    ) : (
                        !isLoading && (
                            <p className={"yazi"}>Axtarışınıza aid məhsul tapılmadı</p>
                        )
                    )}
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

export default Search;
