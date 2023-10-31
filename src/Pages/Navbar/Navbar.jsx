import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav_wrapper">
            <Link to="/" className="nav_links">
                Patients
            </Link>
            <Link to="/wards" className="nav_links">
                Wards
            </Link>
            <Link to="/hospital" className="nav_links">
                Hospital
            </Link>
            <a
                href="https://github.com/rushikesh1799/carewise"
                className="nav_links"
                target="_blank"
            >
                github
            </a>
            <a
                href="https://replit.com/@RushikeshBunge1/PatientSync-backend-API#index.js"
                className="nav_links"
                target="_blank"
            >
                replit
            </a>
        </nav>
    );
};

export default Navbar;
