import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../utils/api';

function AllArticles() {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetchArticles().then((data) => {
			setArticles(data.articles);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <p className="Loading">LOADING</p>;
	}
	return (
		<div className="articles-container">
			<h2>Please select your desired article:</h2>
			<ul className="list-of-articles">
				{articles.map((article, index) => (
					<Link
						to={`/AllArticles/${article.article_id}`}
						key={index}
						className="article-link">
						<li className="articleLinkCard">
							<img
								src={article.article_img_url}
								alt={article.title}
							/>
							<p>{article.title}</p>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
export default AllArticles;
