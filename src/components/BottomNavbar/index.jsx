import './index.scss';
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {BsHandbag} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {Link} from "react-router";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {
    useGetAllCategoriesTreeQuery,
    useGetAllProductByNameQuery,
    useGetBasketItemsQuery,
    useGetUserDetailsQuery,
    useGetWishlistItemsQuery
} from "../../services/usersApi.jsx";
import {useEffect, useState} from "react";
import {GoHeart} from "react-icons/go";

function BottomNavbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(null);

    const {data: getAllProductByName} = useGetAllProductByNameQuery(searchTerm);
    const productsByName = getAllProductByName?.data;

    const navigate = useNavigate();
    const token = Cookies.get('expoToken');

    const {data: getBasketItems, refetch} = useGetBasketItemsQuery();
    const basket = getBasketItems?.data || [];
    useEffect(() => {
        refetch();
    }, [refetch]);

    const {data: productsData, isLoading: productLoading, refetch: wishlistRefetch} = useGetWishlistItemsQuery();
    const products = productsData?.data?.items;
    useEffect(() => {
        wishlistRefetch();
    }, []);

    const {data: getUserDetails} = useGetUserDetailsQuery();
    const user = getUserDetails?.data;

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    const {data: getAllCategoriesTree} = useGetAllCategoriesTreeQuery();
    const categories = getAllCategoriesTree?.data || [];

    const handleMouseEnter = (index) => {
        setActiveCategory(index);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    const renderCategories = (categories) => {
        return (
            <ul className="categoryMenu">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        onMouseLeave={handleMouseLeave}
                        className="categoryItem"
                    >
                        {category.name}
                        {activeCategory === category.id && category.subCategories?.length > 0 && (
                            <div className="subcategoryMenu">
                                {renderCategories(category.subCategories)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section id={"bottomNavbar"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"catalogWrapper"}>
                        <HiOutlineSquares2X2 className={"icon"}/>
                        <span>Kataloq</span>
                        {categories && renderCategories(categories)}
                    </div>
                    <input
                        placeholder={"Axtar..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <div className={"actionWrapper"}>
                        <div style={{position: 'relative'}}>
                            <GoHeart
                                className={"icon"}
                                style={{marginRight: '10px'}}
                                onClick={() => navigate('/wishlist')}
                            />
                            <span className={"span"}>{products && products.length}</span>
                        </div>
                        <div style={{position: 'relative'}}>
                            <BsHandbag
                                className={"icon"}
                                onClick={() => navigate('/basket')}
                            />
                            <span className={"span"}>{basket && basket.length}</span>
                        </div>
                        <div className={"line1"}></div>
                        <div className="buttonWrapper">
                            {token === "null" ? (
                                <>
                                    <Link to={`/register`}>
                                        <button className="button">Register</button>
                                    </Link>
                                    <Link to={`/login`}>
                                        <button>Login</button>
                                    </Link>
                                </>
                            ) : (
                                <p>
                                    Salam, <span style={{
                                    color: '#0DA5B5',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }} onClick={() => {
                                    navigate('/profile')
                                }}>{user?.userName}!</span>
                                </p>
                            )}
                        </div>
                        <BiUser className={"icon1 icon"}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomNavbar;
