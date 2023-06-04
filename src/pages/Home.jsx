import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((res) => setCategories(res.categories))
            .catch((err) => console.log(err));
    }, []);
    const navigateToProductlistPage = (category) => {
        navigate(`/product-list`, { state: { category, applyOnce: true } });
    };
    return (
        <div>
            <div
                className="banner-image"
                style={{
                    backgroundImage: `url(https://www.bookswagon.com/images/bannerimages/80_inr.jpg?v=1.6)`,
                }}
            ></div>
            <p>Categories</p>
            <div className="category-container">

                {categories.length > 0 &&
                    categories.map(({ _id, categoryName, description }) => (
                        <div
                            className="categoryCard"
                            key={_id}
                            onClick={() => navigateToProductlistPage(categoryName)}
                        >
                            <p>{categoryName}</p>
                            <p>{description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;
