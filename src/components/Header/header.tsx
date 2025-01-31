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
    const { runCode } = useRun(); // useRun 훅 가져오기

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

    // 모달 닫기 핸들러
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

            console.log("📡 제출 데이터:", { code, problemId, language });

            const result = await runCode({ code, problemId, language });
            console.log("✅ 제출 결과:", result);

            // 제출 완료 후 로컬 스토리지에서 code와 problemId 삭제
            localStorage.removeItem("code");
            localStorage.removeItem("problemId");
            console.log("🗑️ 로컬 스토리지에서 code와 problemId 삭제 완료");

            navigate("/chat");
        } catch (error) {
            console.error("❌ 제출 실패:", error);
            alert("제출 중 오류가 발생했습니다.");
        }
    };

    // 현재 라우터 경로에 따라 버튼 렌더링
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
