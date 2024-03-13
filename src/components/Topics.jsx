import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../utils/api';

function Topics() {
	const [topics, setTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		setIsLoading(true);
		fetchTopics()
			.then((response) => {
				console.log(response);
				setTopics(response);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error getting Topics', error);
				setIsLoading(false);
				setErrMsg('Error getting Topics');
				setIsError(true);
			});
	}, []);

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
		<div className="topics-container">
			<h3>Please select the intrested Topics</h3>
			<ul>
				{topics.map((topic, index) => (
					<Link to={`/Topics/${topic.slug}`} key={index}>
						<li key={index}>{topic.slug}</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
export default Topics;
