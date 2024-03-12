import axios from "axios";

const BASE_URL = "https://ncn-network.onrender.com/api/articles/";

export const fetchArticles = ( () => {
    return axios.get(`${BASE_URL}`)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.error("Error fetching articles:", error);
        throw error;
      });
})

export const fetchArticle = (articleId) => {
  return axios.get(`${BASE_URL}${articleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

export const fetchComments = (articleId) => {
  return axios.get(`${BASE_URL}${articleId}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      throw error;
    });
};

export const updateArticleVotes = (articleId, voteChange) => {
  return axios.patch(`${BASE_URL}${articleId}`, {
    inc_votes: voteChange,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating article votes:", error);
      throw error;
    });
};

export const postComment = (articleId, username, body) => {
  return axios.post(`${BASE_URL}${articleId}/comments`, {
    username,
    body,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
      throw error;
    });
};

export const deleteCommentById = (comment_id) => {
    return axios.delete(`https://ncn-network.onrender.com/api/comments/${comment_id}`)
      .catch((error) => {
        console.error("Error posting comment:", error);
        throw error;
      });
}
