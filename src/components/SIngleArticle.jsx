import axios, { Axios } from "axios";
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

  function increaseVotes(comment) {
    const updatedComments = comments.map((singleComment) => {
      if (singleComment.comment_id === comment.comment_id) {
        return { ...singleComment, votes: singleComment.votes + 1 };
      }
      return singleComment;
    });
    setComments(updatedComments);
  }
  function decreaseVotes(comment) {
    const updatedComments = comments.map((singleComment) => {
      if (singleComment.comment_id === comment.comment_id) {
        return { ...singleComment, votes: singleComment.votes - 1 };
      }
      return singleComment;
    });
    setComments(updatedComments);
  }

  return (
    <>
      <div className="singleArticle">
        <img src={article.article_img_url} alt="" />
        <h2>{article.title}</h2>
        <h3>Author: {article.author}</h3>
        <p>{article.body}</p>
        <h4>Created at: {article.created_at}</h4>
      </div>
      <div className="comment-container">
        {comments.map((comment, index) => (
          <Link
            to={`/AllArticles/${article.article_id}`}
            key={index}
            className="article-link"
          >
            <li className="commentItem">
              <h5>{comment.author}</h5>
              <p>{comment.body}</p>
              <h6>Created at: {comment.created_at}</h6>
              <div className="vote-container">
                <p>Current Votes: {comment.votes}</p>
                <button className="vote-button" onClick={() => increaseVotes(comment)}>+1</button>
                <button className="vote-button" onClick={() => decreaseVotes(comment)}>-1</button>
              </div>
            </li>
          </Link>
        ))}
      </div>
    </>
  );
}
export default SingleArticle;
