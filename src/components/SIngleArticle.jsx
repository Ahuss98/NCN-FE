import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticle,
  fetchComments,
  updateArticleVotes,
  postComment,
} from "../utils/api";

function SingleArticle() {
  let { article_id } = useParams();
  const [isPosted,setIsPosted] = useState(false)
  const [posting, setPosting] = useState(false)
  const [newUser, setNewUser] = useState("grumpy19")
  const [newBody, setNewBody] = useState("")
  const [article, setArticle] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    setIsLoading(true)
    fetchArticle(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, [article_id]);

  useEffect(() => {
    fetchComments(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [article_id]);

  const increaseArticleVotes = () => {
    const updatedArticle = { ...article, votes: article.votes + 1 };
    setArticle(updatedArticle);
    updateArticleVotes(article_id, 1).catch((error) => {
      console.error("Error updating article votes:", error);
    });
  };

  const decreaseArticleVotes = () => {
    const updatedArticle = { ...article, votes: article.votes - 1 };
    setArticle(updatedArticle);
    updateArticleVotes(article_id, -1).catch((error) => {
      console.error("Error updating article votes:", error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting comment:", newUser, newBody);
    setPosting(true);
    postComment(article_id, newUser, newBody)
      .then((response) => {
        const updatedComments = [...comments, response];
        setComments(updatedComments);
        setNewBody("");
        setPosting(false);
        setIsPosted(true);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        setPosting(false);
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

  if (isLoading){
    return(
        <p className="Loading">LOADING</p>
    )
}
  return (
    <>
      <div className="singleArticle">
        <img src={article.article_img_url} alt="" />
        <h2>{article.title}</h2>
        <h3>Author: {article.author}</h3>
        <p>{article.body}</p>
        <h4>Created at: {new Date(article.created_at).toLocaleString()}</h4>
        <div className="vote-container">
          <p>Current Votes: {article.votes}</p>
          <button className="vote-button" onClick={increaseArticleVotes}>
            +1
          </button>
          <button className="vote-button" onClick={decreaseArticleVotes}>
            -1
          </button>
        </div>
      </div>
      {posting ? (
          <p className="posting-comment">Posting comment</p>
      ) : (
          <>
           {isPosted ? (
                 <p className="success-message">Comment posted successfully!</p>
            ):(<p></p>)}
          <div className="comment-container">
          <form onSubmit={handleSubmit} className="commentItem-New">
            <h4>Add your own comment:</h4>
            <label htmlFor="comment">Your Comment:</label>
            <input
              type="text"
              id="comment"
              value={newBody}
              onChange={(event) => setNewBody(event.target.value)}
              placeholder="Enter your comment"
            />
            <button type="submit">Post Comment</button>
          </form>
        </div>
      <div className="comment-container">
        {comments.map((comment, index) => (
            <div key={index} className="commentItem">
            <h5>{comment.author}</h5>
            <p>{comment.body}</p>
            <h6>Created at: {new Date(comment.created_at).toLocaleString()}</h6>
          </div>
        ))}
      </div>
        </>
        )}
    </>
  );
}

export default SingleArticle;
