import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUser1, fetchUser2 } from '../utils/api';
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from 'react-icons/bs'

function HomePage() {
	const [articles, setArticles] = useState([]);
	const [slide, setSlide] = useState(0)
	const [isLoading, setIsLoading] = useState(false);
	
	const getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	  }

	  const nextSlide = () => {
		if (slide === 2){
			setSlide(slide - slide)
		} else {
			setSlide( slide + 1)
		}
	  }
	  const previousSlide = () => {
		if (slide === 0){
			setSlide(2)
		} else {
			setSlide( slide - 1)
		}
	  }

	useEffect(() => {
		setIsLoading(true);
		let newArticles = [];

		const fetchAndAddArticle = (num) => {
			fetchUser1(num)
			  .then((response) => {
				newArticles.push(response)
				if (newArticles.length === 3) {

				  setArticles([...articles, ...newArticles]);
				  setIsLoading(false);
				}
			  })
			  .catch((error) => {
				console.error('Error fetching article:', error);
				setIsLoading(false);
			  });
		  };
		
		  let newNumb1 = getRandomInt(36);
		  let newNumb2 = getRandomInt(36);
		  let newNumb3 = getRandomInt(36);
		
		  fetchAndAddArticle(newNumb1);
		  fetchAndAddArticle(newNumb2);
		  fetchAndAddArticle(newNumb3);
		
		}, []);

	console.log(articles,',,,,articles in homepage')
	if (isLoading) {
		return <p className="Loading">LOADING</p>;
	}
	return (
		<div className="HomePage">
			<div className="header">
				<h1>
					<span>Welcome</span>
					<span>to</span>
					<span>the</span>
					<span>NorthCoders</span>
					<span>News</span>
					<span>Network</span>
				</h1>
			</div>

			<div className="main-content">
				<h4 className="blurb">
					Here at the NorthCoders News Network, our commitment is to
					deliver the best and most reliable articles from every
					corner of the Earth. We focus on providing a clean and
					responsive experience to all our users!
				</h4>
				<h2>Popular Articles:</h2>

				<div className="carousel" >
					<BsArrowLeftCircleFill className='arrow arrow-left' onClick={previousSlide}/>
						{articles.map((item,index) => {
							{console.log(item),'inside the map'}
							return (
								<Link to={`/AllArticles/${item.article_id}`}>
								<img src={item.article_img_url} alt='item.title' key={index} className={slide === index ? 'slide' : 'slide slide-hidden'}/>
								</Link>
							)
						})}
					<BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide}/>
					<span className='indicators'>
						{articles.map((_, index) => {
							return <button key={index} onClick={null} className={slide === index ? 'indicator' : 'indicator indicator-inactive' }></button>
						})}
					</span>
				</div>
			</div>
		</div>
	);
}
export default HomePage;
