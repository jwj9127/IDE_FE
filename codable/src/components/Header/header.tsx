import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/study">
                    <img src={logo} alt="Codable" className="logo-image" />
                </Link>
            </div>
            <nav className="nav"></nav>
        </header>
    );
};

export default Header;
