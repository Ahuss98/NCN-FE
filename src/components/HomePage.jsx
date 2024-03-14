import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUser1, fetchUser2 } from '../utils/api';

function HomePage() {
	const [user1, setUser1] = useState({});
	const [user2, setUser2] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetchUser2().then((response) => {
			setUser2(response);
		});
		fetchUser1().then((response) => {
			setIsLoading(false);
			setUser1(response);
		});
	}, []);

	if (isLoading) {
		return <p className="Loading">LOADING</p>;
	}
	return (
		<div className="HomePage">
			<div className="header">
				<h1>
					<span>Welcome</span>
					<span>to</span>
					<span>the</span>
					<span>NorthCoders</span>
					<span>News</span>
					<span>Network</span>
				</h1>
			</div>

			<div className="main-content">
				<h4 className="blurb">
					Here at the NorthCoders News Network, our commitment is to
					deliver the best and most reliable articles from every
					corner of the Earth. We focus on providing a clean and
					responsive experience to all our users!
				</h4>
				<h2>Latest Articles</h2>
				<div className="article-container" id="preview-container">
					<div className="article-link">
						<Link to="/AllArticles/1" className="preview">
							<img src={user1.article_img_url} />
							<h3>{user1.title}</h3>
							<p>{user1.author}</p>
						</Link>
					</div>
					<div className="article-link">
						<Link to="/AllArticles/21" className="preview">
							<img src={user2.article_img_url} />
							<h3>{user2.title}</h3>
							<p>{user2.author}</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default HomePage;
