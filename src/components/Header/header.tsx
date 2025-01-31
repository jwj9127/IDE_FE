import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../assets/logo.png";
import ModalBack from "../Modal/modalBack";
import ModalSubmit from "../Modal/modalSubmit";

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isBackModalOpen, setIsBackModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

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

    const handleOpenModal = () => {
        setIsBackModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsBackModalOpen(false);
    };

    const handleOpenSubmitModal = () => {
        setIsSubmitModalOpen(true);
    };

    const handleCloseSubmitModal = () => {
        setIsSubmitModalOpen(false);
    };

    const renderNavContent = () => {
        if (location.pathname === "/editor") {
            return (
                <>
                    <button
                        className={styles["nav-button"]}
                        onClick={handleOpenSubmitModal}
                    >
                        제출하기
                    </button>
                    <button
                        className={styles["nav-button"]}
                        onClick={handleOpenModal}
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
                <button className={styles["nav-button"]} onClick={handleLogout}>
                    로그아웃
                </button>
            );
        }
        return null;
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo} onClick={handleLogoClick}>
                    <img
                        src={logo}
                        alt="Codable"
                        className={styles["logo-image"]}
                    />
                </div>
                <nav className={styles.nav}>{renderNavContent()}</nav>
            </header>
            <ModalBack isOpen={isBackModalOpen} onClose={handleCloseModal} />
            <ModalSubmit
                isOpen={isSubmitModalOpen}
                onClose={handleCloseSubmitModal}
            />
        </>
    );
};

export default Header;
