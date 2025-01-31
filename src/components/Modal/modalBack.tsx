import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { ModalProps } from "./modal.types";
import styles from "./modal.module.scss"; // CSS Modules import

const ModalBack: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const { animation, handleClose, handleNavigate } = useModal(
        isOpen,
        onClose,
        "/study"
    );

    return isOpen ? (
        <div className={styles["modal-overlay"]}>
            <div className={`${styles["modal-space"]} ${styles[animation]}`}>
                <div className={styles["modal-wrap"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles["modal-text"]}>
                            정말 나가시겠습니까?
                        </div>
                        <div className={styles["modal-close"]}>
                            <div
                                className={styles["close-btn"]}
                                onClick={handleClose}
                            >
                                취소
                            </div>
                            <div
                                className={styles["close-btn"]}
                                onClick={() => handleNavigate(navigate)}
                            >
                                나가기
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalBack;
