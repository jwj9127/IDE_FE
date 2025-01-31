import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { ModalProps } from "./modal.types";
import styles from "./modal.module.scss";
import { useRun } from "../../hooks/useRun";

const ModalSubmit: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { runCode } = useRun();

    const { animation, handleClose } = useModal(isOpen, onClose);

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

            await runCode({ code, problemId, language });

            localStorage.removeItem("code");
            localStorage.removeItem("problemId");

            navigate("/chat");
        } catch (error) {
            console.error("❌ 제출 실패:", error);
            alert("제출 중 오류가 발생했습니다.");
        }
    };

    return isOpen ? (
        <div className={styles["modal-overlay"]}>
            <div className={`${styles["modal-space"]} ${styles[animation]}`}>
                <div className={styles["modal-wrap"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles["modal-text"]}>
                            제출하면 다시 돌아올 수 없습니다.
                        </div>
                        <div className={styles["modal-close"]}>
                            <button
                                className={styles["close-btn"]}
                                onClick={handleClose}
                            >
                                취소
                            </button>
                            <button
                                className={styles["close-btn"]}
                                onClick={handleSubmit}
                            >
                                제출하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalSubmit;
