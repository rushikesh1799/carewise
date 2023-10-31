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
        </nav>
    );
};

export default Navbar;
