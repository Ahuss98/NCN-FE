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
				setTopics(response);
				setIsLoading(false);
			})
			.catch((error) => {
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
			<div className='topics-container-list'>
				{topics.map((topic, index) => (
					<Link to={`/Topics/${topic.slug}`} 
					key={index}
					className={topic.slug}
					>
						<p key={index}>{(topic.slug).toUpperCase()}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
export default Topics;
