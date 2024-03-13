import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { fetchUser1,fetchUser2 } from '../utils/api';

function HomePage() {

	const [user1,setUser1] = useState({})
	const [user2,setUser2] = useState({})
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true)
		fetchUser2()
		.then((response) => {
			setUser2(response)
		})
		fetchUser1()
		.then((response) => {
			setIsLoading(false)
			setUser1(response)
		})
	},[])

	if (isLoading) {
		return <p className="Loading">LOADING</p>;
	}
	return (
		<div className="HomePage">
			<div className="header">
				<h1>Welcome to the NorthCoders News Network</h1>
			</div>

			<div className="main-content">
				<h2>Latest Articles</h2>
				<div className="article-container">
					<div className="article-link">
						<Link to="/AllArticles/9"
						className='preview'
						>
							<img src={user1.article_img_url} />
							<h3>{user1.title}</h3>
							<p>{user1.author}</p>
						</Link>
					</div>
					<div className="article-link">
					<Link to="/AllArticles/34"
					className='preview'
					>
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
export default HomePage