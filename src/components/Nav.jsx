import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Nav() {
    const location = useLocation();

    return (
    <nav>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}> Home </Link>
            <Link to="/AllArticles" className={location.pathname === "/AllArticles" ? "active" : ""}>View All Articles</Link>
    </nav>
    );
}

export default Nav;