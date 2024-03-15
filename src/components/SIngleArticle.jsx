import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../components/Login'

import {
	fetchArticle,
	fetchComments,
	updateArticleVotes,
	postComment,
	deleteCommentById,
} from '../utils/api';

function SingleArticle() {
	let { article_id } = useParams();
	const [isDeleted, setIsDeleted] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [isPosted, setIsPosted] = useState(false);
	const [posting, setPosting] = useState(false);
	const [newUser, setNewUser] = useState('grumpy19');
	const {selectedUser, setSelectedUser} = useContext(UserContext);
	const [newBody, setNewBody] = useState('');
	const [article, setArticle] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [comments, setComments] = useState([]);
	const [isError, setIsError] = useState(false);
	const [errMsg, setErrMsg] = useState('');


	console.log(selectedUser,'<<<<in the single article page')
	useEffect(() => {
		setIsLoading(true);
		fetchArticle(article_id)
			.then((fetchedArticle) => {
				setArticle(fetchedArticle);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching article:', error);
				setErrMsg('Error fetching article');
				setIsLoading(false);
				setIsError(true);
			});
	}, [article_id]);

	useEffect(() => {
		fetchComments(article_id)
			.then((fetchedComments) => {
				setComments(fetchedComments);
			})
			.catch((error) => {
				console.error('Error fetching comments:', error);
			});
	}, [article_id]);

	const increaseArticleVotes = () => {
		const updatedArticle = { ...article, votes: article.votes + 1 };
		setArticle(updatedArticle);
		updateArticleVotes(article_id, 1).catch((error) => {
			console.error('Error updating article votes:', error);
			setErrMsg('Error updating article votes');
			setIsLoading(false);
			setIsError(true);
		});
	};

	const decreaseArticleVotes = () => {
		const updatedArticle = { ...article, votes: article.votes - 1 };
		setArticle(updatedArticle);
		updateArticleVotes(article_id, -1).catch((error) => {
			console.error('Error updating article votes:', error);
			setErrMsg('Error updating article votes');
			setIsLoading(false);
			setIsError(true);
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setPosting(true);
		postComment(article_id, selectedUser.username, newBody)
			.then((response) => {
				const updatedComments = [ response,...comments];
				setComments(updatedComments);
				setNewBody('');
				setPosting(false);
				setIsPosted(true);
			})
			.catch((error) => {
				console.error('Error adding comment:', error);
				setPosting(false);
				setErrMsg('Error adding comment');
				setIsLoading(false);
				setIsError(true);
			});
	};

	useEffect(() => {
		if (isPosted) {
			const timer = setTimeout(() => {
				setIsPosted(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isPosted]);

	const deleteComment = (id) => {
		setDeleting(true);
		deleteCommentById(id)
			.then((response) => {
				setDeleting(false);
				setIsDeleted(true);
				setComments(
					comments.filter((comment) => comment.comment_id !== id)
				);
			})
			.catch((error) => {
				console.error('Error deleting comment:', error);
				setDeleting(false);
				setErrMsg('Error deleting comment');
				setIsLoading(false);
				setIsError(true);
			});
	};
	useEffect(() => {
		if (isDeleted) {
			const timer = setTimeout(() => {
				setIsDeleted(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isDeleted]);

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
		<>
			<div className="singleArticle">
				<img src={article.article_img_url} alt="" />
				<h2>{article.title}</h2>
				<h3>Author: {article.author}</h3>
				<p>{article.body}</p>
				<h4>
					Created at: {new Date(article.created_at).toLocaleString()}
				</h4>
				<div className="vote-container">
					<p>Current Votes: {article.votes}</p>
					<button
						className="vote-button"
						onClick={increaseArticleVotes}>
						+1
					</button>
					<button
						className="vote-button"
						onClick={decreaseArticleVotes}>
						-1
					</button>
				</div>
			</div>
			{posting || deleting ? (
				<p className="Loading">updating Comments</p>
			) : (
				<>
					{isPosted ? (
						<p className="success-message">
							Comment posted successfully!
						</p>
					) : (
						<p></p>
					)}
					<div className="comment-container">
						<form
							onSubmit={handleSubmit}
							className="commentItem-New">
							<h4>Add your own comment:</h4>
							<label htmlFor="comment">Your Comment:</label>
							<input
								type="text"
								id="comment"
								value={newBody}
								onChange={(event) =>
									setNewBody(event.target.value)
								}
								placeholder="Enter your comment"
							/>
							<button type="submit">Post Comment</button>
						</form>
					</div>{' '}
					{isDeleted ? (
						<p className="deleted-message">comment deleted</p>
					) : (
						<p></p>
					)}
					<div className="comment-container">
						{comments.map((comment, index) => (
							<div key={index} className="commentItem">
								<h5>{comment.author}</h5>
								<p>{comment.body}</p>
								<h6>
									Created at:{' '}
									{new Date(
										comment.created_at
									).toLocaleString()}
								</h6>
								<button
									onClick={() =>
										deleteComment(comment.comment_id)
									}>
									DELETE
								</button>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}

export default SingleArticle;
