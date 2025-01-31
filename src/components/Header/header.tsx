import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";
import ModalBack from "../Modal/modalBack";
import { useRun } from "../../hooks/useRun";

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { runCode } = useRun();

    const handleLogoClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/study");
        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const code = localStorage.getItem("code") || "";
            const problemId = parseInt(
                localStorage.getItem("problemId") || "0"
            );
            const language = "python";

            if (!code) {
                alert("코드를 입력해주세요.");
                return;
            }

            const result = await runCode({ code, problemId, language });

            localStorage.removeItem("code");
            localStorage.removeItem("problemId");

            navigate("/chat");
        } catch (error) {
            console.error("❌ 제출 실패:", error);
            alert("제출 중 오류가 발생했습니다.");
        }
    };

    const renderNavContent = () => {
        if (location.pathname === "/editor") {
            return (
                <>
                    <button className="nav-button" onClick={handleSubmit}>
                        제출하기
                    </button>
                    <button
                        className="nav-button"
                        onClick={() => setIsModalOpen(true)}
                    >
                        나가기
                    </button>
                </>
            );
        } else if (
            location.pathname === "/chat" ||
            location.pathname === "/study"
        ) {
            return (
                <button className="nav-button" onClick={handleLogout}>
                    로그아웃
                </button>
            );
        }
        return null;
    };

    return (
        <>
            <header className="header">
                <div className="logo" onClick={handleLogoClick}>
                    <img src={logo} alt="Codable" className="logo-image" />
                </div>
                <nav className="nav">{renderNavContent()}</nav>
            </header>
            <ModalBack isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default Header;
