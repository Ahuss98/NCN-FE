import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllArticles from './components/AllArticles';
import Header from './components/Header';
import Nav from './components/Nav'; 

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AllArticles" element={<AllArticles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
