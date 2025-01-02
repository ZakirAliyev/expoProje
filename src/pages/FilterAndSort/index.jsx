import './index.scss';
import ProductCard from "../../components/ProductCard/index.jsx";
import Pagination from "../../components/Pagination";
import {Button, Col, InputNumber, Row, Slider, Input, Radio} from "antd";
import {useState, useEffect} from "react";
import {useGetAllCategoriesTreeQuery, useGetAllProductsByCategoryIdQuery} from "../../services/usersApi.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import AnyLoading from "../../components/AnyLoading/index.jsx";
import {Helmet} from "react-helmet-async";

function FilterAndSort() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(15000);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([] || null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [sortOrder, setSortOrder] = useState(null); // Added sortOrder

    const onSliderChange = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    };

    const onMinPriceChange = (value) => {
        setMinPrice(value || 0);
    };

    const onMaxPriceChange = (value) => {
        setMaxPrice(value || 15000);
    };

    const {data: getAllCategoriesTree} = useGetAllCategoriesTreeQuery();
    const categories = getAllCategoriesTree?.data;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryName = queryParams.get("categoryName");
    const categoryId = queryParams.get("categoryId");

    const {
        data: getAllProductsByCategoryId,
        isLoading,
        refetch: zakir1
    } = useGetAllProductsByCategoryIdQuery(categoryId);
    const allProducts = getAllProductsByCategoryId?.data || [];

    useEffect(() => {
        if (allProducts) {
            applyFiltersAndSort();
        }
    }, [allProducts, minPrice, maxPrice, selectedSubCategory, sortOrder]);

    const applyFiltersAndSort = () => {
        const filtered = allProducts.filter((product) => {
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            const matchesSubCategory = !selectedSubCategory || selectedSubCategory === product?.categoryId;
            return matchesPrice && matchesSubCategory;
        })

        if (sortOrder) {
            filtered.sort((a, b) => {
                return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
            });
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const navigate = useNavigate()

    return (
        <section id="filterAndSort">
            <Helmet>
                <title>Kateqoriyalar</title>
            </Helmet>
            <div className="container">
                <h2>
                    {categoryName
                        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
                        : "Products"}
                </h2>
                <div className="lineWrapper">
                    <div className="greenLine"></div>
                </div>
                <div className="row">
                    <div className="col-4 col-md-4 col-sm-12 col-xs-12" style={{padding: "0"}}>
                        <div className="wrapper">
                            <div className="box">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Qiymət filteri</h3>
                                        <div className="lineWrapper">
                                            <div className="greenLine"></div>
                                        </div>
                                        <Slider
                                            range={{draggableTrack: true}}
                                            max={15000}
                                            value={[minPrice, maxPrice]}
                                            onChange={onSliderChange}
                                            trackStyle={{backgroundColor: "#0DA5B5"}}
                                        />
                                        <Row style={{marginTop: "20px"}} gutter={16}>
                                            <Col span={12}>
                                                <InputNumber
                                                    min={0}
                                                    max={15000}
                                                    value={minPrice}
                                                    onChange={onMinPriceChange}
                                                    style={{width: "100%"}}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <InputNumber
                                                    min={0}
                                                    max={15000}
                                                    value={maxPrice}
                                                    onChange={onMaxPriceChange}
                                                    style={{width: "100%"}}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="col-12">
                                        <h3>Alt kateqoriya</h3>
                                        <div className="lineWrapper">
                                            <div className="greenLine"></div>
                                        </div>
                                        <Input
                                            placeholder="Alt kateqoriya axtar..."
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            style={{marginBottom: "10px", width: "100%"}}
                                        />
                                        <Radio.Group
                                            onChange={
                                                (e) => {
                                                    setSelectedSubCategory(e.target.value)
                                                }}
                                            value={selectedSubCategory}
                                            style={{width: "100%"}}
                                        >
                                            <Radio
                                                style={{
                                                    display: "block",
                                                    marginBottom: "8px",
                                                }}
                                                value={null}
                                            >
                                                Hamısı
                                            </Radio>
                                            {categories &&
                                                categories.map((category) =>
                                                    category?.name.toLowerCase() === categoryName?.toLowerCase() &&
                                                    category?.subCategories
                                                        ?.filter((subCategory) =>
                                                            subCategory?.name
                                                                ?.toLowerCase()
                                                                .includes(searchKeyword.toLowerCase())
                                                        )
                                                        .map((subCategory) => (
                                                            <Radio
                                                                key={subCategory?.id}
                                                                value={subCategory?.id}
                                                                style={{
                                                                    display: "block",
                                                                    marginBottom: "8px",
                                                                }}
                                                            >
                                                                {subCategory?.name
                                                                    ? subCategory.name.charAt(0).toUpperCase() +
                                                                    subCategory.name.slice(1).toLowerCase()
                                                                    : ""}
                                                            </Radio>
                                                        ))
                                                )}
                                        </Radio.Group>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 col-md-8 col-sm-12 col-xs-12">
                        <div className="wrapper">
                            <div className="box box9">
                                <div>
                                    <span>Saya görə:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    >
                                        <option value={12}>12</option>
                                        <option value={18}>18</option>
                                        <option value={24}>24</option>
                                        <option value={30}>30</option>
                                    </select>
                                </div>
                                <div>
                                    <span>Qiymətə görə:</span>
                                    <select
                                        value={sortOrder || ""}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                    >
                                        <option value="">Seç</option>
                                        <option value="asc">Ucuzdan bahaya</option>
                                        <option value="desc">Bahadan ucuza</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {isLoading && <AnyLoading/>}
                        <div className="row">
                            {filteredProducts.length > 0 ? (
                                paginatedProducts.map((product) => (
                                    <div className="col-4 col-md-4 col-sm-12 col-xs-12" key={product.id}>
                                        <ProductCard item={product} categoryId={categoryId}/>
                                    </div>
                                ))
                            ) : (
                                <div className="no-products">
                                    <h2>Məhsul tapılmadı</h2>
                                    {/*<button style={{*/}
                                    {/*    color: 'white',*/}
                                    {/*    backgroundColor: '#0DA5B5',*/}
                                    {/*    borderRadius: '5px'*/}
                                    {/*}} onClick={() => {*/}
                                    {/*    navigate('/')*/}
                                    {/*    window.location.reload()*/}
                                    {/*}}>Ana səhifəyə qayıt*/}
                                    {/*</button>*/}
                                </div>
                            )}
                        </div>
                        <Pagination
                            totalItems={filteredProducts.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FilterAndSort;
