import React from "react";
import { useModal } from "../../hooks/useModal";
import { ModalProps } from "./modal.types";
import "./modal.scss";

const ModalTimer: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const { animation } = useModal(isOpen, onClose);

    return isOpen ? (
        <div className="modal-overlay">
            <div className={`modal-space ${animation}`}>
                <div className="modal-wrap">
                    <div className="modal-content">
                        <div className="modal-text">
                            종료까지 5분 남았습니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModalTimer;
