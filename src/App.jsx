import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllArticles from './components/AllArticles';
import Header from './components/Header';
import Nav from './components/Nav';
import SingleArticle from './components/SIngleArticle';
import SingleComment from './components/SingleComment';
import Topics from './components/Topics';
import ArticleByTopic from './components/articleByTopic';
import NotFoundPage from './components/NotFoundPAge';

function App() {
	return (
		<Router>
			<div>
				<Header />
				<Nav />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/AllArticles" element={<AllArticles />} />
					<Route
						path="/AllArticles/:article_id"
						element={<SingleArticle />}
					/>
					<Route
						path="/:article_id/comments/:comment_id"
						element={<SingleComment />}
					/>
					<Route path="/Topics" element={<Topics />} />
					<Route path="/Topics/:topic" element={<ArticleByTopic />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
