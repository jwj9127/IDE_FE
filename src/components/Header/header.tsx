import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
    const location = useLocation();

    // 현재 라우터 경로에 따라 버튼 렌더링
    const renderNavContent = () => {
        if (location.pathname === "/editor") {
            return (
                <button
                    className="nav-button"
                    onClick={() => window.history.back()}
                >
                    나가기
                </button>
            );
        } else if (
            location.pathname === "/chat" ||
            location.pathname === "/study"
        ) {
            return (
                <button
                    className="nav-button"
                    onClick={() => console.log("로그아웃")}
                >
                    로그아웃
                </button>
            );
        }
        return null;
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/study">
                    <img src={logo} alt="Codable" className="logo-image" />
                </Link>
            </div>
            <nav className="nav">{renderNavContent()}</nav>
        </header>
    );
};

export default Header;
