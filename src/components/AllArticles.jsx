import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function AllArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
    axios.get("https://ncn-network.onrender.com/api/articles").then((response) => {
        setArticles(response.data.articles);
    });
    }, []);

    return (
    <div className="articles-container">
        <h2>Please select your desired article:</h2>
        <ul className="list-of-articles">
        {articles.map((article, index) => (
            <Link
            to={`/AllArticles/${article.article_id}`}
            key={index}
            className="article-link"
            >
            <li className="articleLinkCard">
                <p>{article.title}</p>
                <img src={article.article_img_url} alt={article.title} />
            </li>
            </Link>
        ))}
        </ul>
    </div>
  );
}
export default AllArticles;
