import axios from 'axios';

const BASE_URL = 'https://ncn-network.onrender.com/api/articles/';

export const fetchUser1 =(numb) => {
	return axios
	.get(`https://ncn-network.onrender.com/api/articles/${numb}`)
		.then((response) => {
			return response.data
		})
		.catch((error) => {
			console.error('Error fetching articles:', error);
			throw error;
		});
}

export const fetchAllUsers =() => {
	return axios
	.get(`https://ncn-network.onrender.com/api/users`)
	.then((response) => {
		return response.data
	})
	.catch((error) => {
		console.error('Error fetching users:', error);
			throw error;
	})
}

export const fetchArticles = () => {
	return axios
		.get(`${BASE_URL}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching articles:', error);
			throw error;
		});
};

export const fetchArticleByTopic = (topic) => {
	return axios
		.get(`https://ncn-network.onrender.com/api/articles?topic=${topic}`)
		.then((response) => {
			return response.data;
		});
};

export const fetchSortedArticle = (topic, selectedSort, order) => {
	return axios
		.get(
			`https://ncn-network.onrender.com/api/articles?topic=${topic}&sort_by=${selectedSort}&order=${order}`
		)
		.then((response) => {
			return response.data;
		});
};

export const fetchTopics = () => {
	return axios
		.get('https://ncn-network.onrender.com/api/topics')
		.then((response) => {
			return response.data;
		});
};

export const fetchArticle = (articleId) => {
	return axios
		.get(`${BASE_URL}${articleId}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching article:', error);
			throw error;
		});
};

export const fetchComments = (articleId) => {
	return axios
		.get(`${BASE_URL}${articleId}/comments?sort_by=created_at`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching comments:', error);
			throw error;
		});
};

export const updateArticleVotes = (articleId, voteChange) => {
	return axios
		.patch(`${BASE_URL}${articleId}`, {
			inc_votes: voteChange,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error updating article votes:', error);
			throw error;
		});
};

export const postComment = (articleId, username, body) => {
	return axios
		.post(`${BASE_URL}${articleId}/comments`, {
			username,
			body,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error posting comment:', error);
			throw error;
		});
};

export const deleteCommentById = (comment_id) => {
	return axios
		.delete(`https://ncn-network.onrender.com/api/comments/${comment_id}`)
		.catch((error) => {
			console.error('Error posting comment:', error);
			throw error;
		});
};
