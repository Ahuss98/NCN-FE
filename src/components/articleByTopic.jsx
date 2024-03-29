import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleByTopic, fetchSortedArticle } from '../utils/api';

function ArticleByTopic() {
	let { topic } = useParams();
	const [articleList, setArticleList] = useState([]);
	const [sortOptions, setSortOptions] = useState(['created_at', 'votes']);
	const [selectedSort, setSelectedSort] = useState('created_at');
	const [isLoading, setIsLoading] = useState(false);
	const [order, setOrder] = useState('DESC');
	const [isError, setIsError] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		setIsLoading(true);
		fetchArticleByTopic(topic)
			.then((response) => {
				setIsLoading(false);
				setArticleList(response.articles);
			})
			.catch((error) => {
				console.error('Error fetching articles:', error);
				setIsLoading(false);
				setErrMsg('Error fetching articles');
				setIsError(true);
			});
	}, [topic]);

	useEffect(() => {
		setIsLoading(true);
		fetchSortedArticle(topic, selectedSort, order)
			.then((response) => {
				setIsLoading(false);
				setArticleList(response.articles);
			})
			.catch((error) => {
				console.error('Error fetching sorted articles:', error);
				setIsLoading(false);
				setErrMsg('Error fetching sorted articles');
				setIsError(true);
			});
	}, [selectedSort, order, topic]);

	const handleSortChange = (event) => {
		setSelectedSort(event.target.value);
	};

	const handleOrderChange = (newOrder) => {
		setOrder(newOrder);
	};

	if (isError) {
		return (
			<>
				<div className="error-container">
					<h3>{errMsg}</h3>
					<p>Please try again later.</p>
				</div>
			</>
		);
	}

	if (isLoading) {
		return <p className="Loading">LOADING</p>;
	}

	return (
		<div className="articles-container">
			<h2>Here are the articels about {topic}</h2>
			<div className="dropdown">
				<label htmlFor="sort">Sort By:</label>
				<select
					id="sort"
					value={selectedSort}
					onChange={handleSortChange}>
					{sortOptions.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
				<button
					className={order === 'ASC' ? 'selected' : ''}
					onClick={() => handleOrderChange('ASC')}>
					ASC
				</button>
				<button
					className={order === 'DESC' ? 'selected' : ''}
					onClick={() => handleOrderChange('DESC')}>
					DESC
				</button>
			</div>
			<ul className="list-of-articles">
				{articleList.map((article, index) => (
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

export default ArticleByTopic;
