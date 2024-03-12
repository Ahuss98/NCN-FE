import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SingleArticle() {
  let { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ncn-network.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data);
      });
  }, [article_id]);

  useEffect(() => {
    axios
      .get(
        `https://ncn-network.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        setComments(response.data);
      });
  }, [article_id]);

  function increaseArticleVotes() {
    const updatedArticle = { ...article, votes: article.votes + 1 };
    setArticle(updatedArticle);
    axios.patch(`https://ncn-network.onrender.com/api/articles/${article_id}`,{
        "inc_votes": 1})
  }

  function decreaseArticleVotes() {
    const updatedArticle = { ...article, votes: article.votes - 1 };
    setArticle(updatedArticle);
    axios.patch(`https://ncn-network.onrender.com/api/articles/${article_id}`,{
        "inc_votes":-1
    })
  }

  return (
    <>
      <div className="singleArticle">
        <img src={article.article_img_url} alt="" />
        <h2>{article.title}</h2>
        <h3>Author: {article.author}</h3>
        <p>{article.body}</p>
        <h4>Created at: {article.created_at}</h4>
        <div className="vote-container">
          <p>Current Votes: {article.votes}</p>
          <button className="vote-button" onClick={increaseArticleVotes}>+1</button>
          <button className="vote-button" onClick={decreaseArticleVotes}>-1</button>
        </div>
      </div>
      <div className="comment-container">
        {comments.map((comment, index) => (
          <div key={index} className="commentItem">
            <h5>{comment.author}</h5>
            <p>{comment.body}</p>
            <h6>Created at: {comment.created_at}</h6>
          </div>
        ))}
      </div>
    </>
  );
}

export default SingleArticle;
