import './index.scss';
import AnyLoading from "../../components/AnyLoading/index.jsx";
import ProductCard from "../../components/ProductCard/index.jsx";
import {useGetWishlistItemsQuery} from "../../services/usersApi.jsx";
import {useEffect} from "react";
import {Helmet} from "react-helmet-async";

function Wishlist() {

    const {data: productsData, isLoading: productLoading, refetch: wishRefetch} = useGetWishlistItemsQuery();
    const products = productsData?.data?.items
    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         wishRefetch();
    //     }, 100);
    //
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <section id={"wishlist"}>
            <Helmet>
                <title>İstək siyahısı</title>
            </Helmet>
            <div className={"container"}>
                <h2>İstək siyahısı</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                {productLoading && (
                    <AnyLoading/>
                )}
                <div className={"row"}>
                    {products && products.map((product1) => (
                        <div className={"col-3 col-md-3 col-sm-6 col-xs-12"} key={product1?.product?.id}>
                            <ProductCard item={product1?.product}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Wishlist;