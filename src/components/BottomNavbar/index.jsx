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

    const [topOffset, setTopOffset] = useState(72);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setTopOffset(Math.max(0, 72 - scrollY));
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCategoryClick = (categoryName, categoryId) => {
        navigate(`/category?categoryName=${categoryName}&&categoryId=${categoryId}`);
    };

    const handleSubCategoryClick = (subCategoryName, subCategoryId) => {
        navigate(`/category?categoryName=${subCategoryName}&&categoryId=${subCategoryId}`);
    };
    const handleUserIconClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

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

    const {data: getProfileData, refetch: refetch1} = useGetUserDetailsQuery()

    useEffect(() => {
        refetch1()
    }, []);

    const renderCategories = (categories) => {
        return (
            <ul className="categoryMenu">
                {categories.map((category) => (
                        <li
                            key={category.id}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            onMouseLeave={handleMouseLeave}
                            className={`categoryItem ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => {
                                handleCategoryClick(category.name, category.id)
                                window.location.reload();
                            }}
                        >
                            {category.name}
                            {activeCategory === category.id && category.subCategories?.length > 0 && (
                                <>
                                    <div
                                        className="subcategoryMenu"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {category.subCategories.slice(20, 30).map((subCategory) => (
                                            <div
                                                key={subCategory.id}
                                                className="subcategoryItem2"
                                                onClick={() => handleSubCategoryClick(subCategory.name, subCategory.id)}
                                            >
                                                {subCategory.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="subcategoryMenu"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {category.subCategories.slice(10, 20).map((subCategory) => (
                                            <div
                                                key={subCategory.id}
                                                className="subcategoryItem1"
                                                onClick={() => handleSubCategoryClick(subCategory.name, subCategory.id)}
                                            >
                                                {subCategory.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="subcategoryMenu"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {category.subCategories.slice(0, 10).map((subCategory) => (
                                            <div
                                                key={subCategory.id}
                                                className="subcategoryItem"
                                                onClick={() => handleSubCategoryClick(subCategory.name, subCategory.id)}
                                            >
                                                {subCategory.name}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </li>
                    )
                )}
            </ul>
        );
    };

    return (
        <section style={{
            top: `${topOffset}px`,
        }} id={"bottomNavbar"}>
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
                            {token !== "null" && (
                                <span className={"span"}>{products && products.length}</span>
                            )}
                        </div>
                        <div style={{position: 'relative'}}>
                            <BsHandbag
                                className={"icon"}
                                onClick={() => navigate('/basket')}
                            />
                            {token !== "null" && (
                                <span className={"span"}>{basket && basket.length}</span>
                            )}
                        </div>
                        <div className={"line1"}></div>
                        <div className="buttonWrapper">
                            {token === "null" ? (
                                <>
                                    <Link to={`/register`}>
                                        <button className="button">Qeydiyyat</button>
                                    </Link>
                                    <Link to={`/login`}>
                                        <button>Daxil ol</button>
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
                        <div
                            className="user-icon-wrapper"
                            onClick={handleUserIconClick}
                        >
                            <BiUser className="icon1 icon"/>
                            {isMenuOpen && (token === "null" ? (
                                <div className="hover-menu">
                                    <button className="hover-button" onClick={() => navigate('/register')}>Qeydiyyat
                                    </button>
                                    <button className="hover-button" onClick={() => navigate('/login')}>Daxil ol
                                    </button>
                                </div>
                            ) : (
                                <div className="hover-menu">
                                    <button className="hover-button1" disabled>{user?.userName}</button>
                                    <button className="hover-button" onClick={() => navigate('/profile')}>Şəxsi
                                        kabinet
                                    </button>
                                    <button className="hover-button" onClick={() => {
                                        Cookies.set("expoToken", "null");
                                        navigate('/');
                                    }}>Çıxış
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomNavbar;
