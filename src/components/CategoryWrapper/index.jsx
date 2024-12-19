import './index.scss';
import {useGetAllCategoriesTreeQuery} from '../../services/usersApi.jsx';
import AnyLoading from "../AnyLoading/index.jsx";
import {useNavigate} from "react-router-dom";

function CategoryWrapper() {
    const {data: getAllCategories, isLoading, isError} = useGetAllCategoriesTreeQuery();
    const categories = getAllCategories?.data || [];

    const navigate = useNavigate();

    return (
        <section id="categoryWrapper">
            <div className={"container"}>
                <h2 className={'menim'}>Kateqoriyalar</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                <div className="row">
                    {isLoading && <AnyLoading/>}
                    {isError && <p>Kateqoriya tapılmadı</p>}
                    {categories.slice(0, 6).map((category, index) => (
                        <div
                            className="col-4 col-md-4 col-sm-12 col-xs-12"
                            key={category.id || index}
                        >
                            <div className="box" onClick={() => {
                                navigate(`/category?categoryName=${category.name}`);
                            }}>
                                <span>{category.name}</span>
                            </div>
                        </div>
                    ))}

                    {!isLoading && !isError && categories.length === 0 && (
                        <p>No categories available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CategoryWrapper;