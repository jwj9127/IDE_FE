import React from "react";
import { useModal } from "../../hooks/useModal";
import { ModalProps } from "./modal.types";
import styles from "./modal.module.scss";

const ModalTimer: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { animation } = useModal(isOpen, onClose);

    return isOpen ? (
        <div className={styles["modal-overlay"]}>
            <div className={`${styles["modal-space"]} ${styles[animation]}`}>
                <div className={styles["modal-wrap"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles["modal-title"]}>
                            종료까지 5분 남았습니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalTimer;
