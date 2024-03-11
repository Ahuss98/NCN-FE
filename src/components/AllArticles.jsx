import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function AllArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:9090/api/articles").then((response) => {
        setArticles(response.data.articles);
    });
    }, []);

    return (
    <div className="Page">
        <h2>Please select your desired article:</h2>
        <ul className="list-of-articles">
        {articles.map((article, index) => (
            <Link
            to={`/items/${article.title}`}
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
