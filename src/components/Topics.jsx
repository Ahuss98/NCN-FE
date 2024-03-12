import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils/api";


function Topics(){
    const [topics, setTopics] = useState([]);


    useEffect(() => {
        fetchTopics()
            .then((response) => {
            console.log(response);
            setTopics(response);
            })
        }, []); 
    
        return (
        <div className="topics-container">
            <h3>Please select the intrested Topics</h3>
            <ul>
            {topics.map((topic, index) => (
                <Link to={`/Topics/${topic.slug}`} key={index}><li key={index}>{topic.slug}</li></Link>
            ))}
            </ul>
        </div>
        );
    }
export default Topics