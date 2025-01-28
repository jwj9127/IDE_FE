import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { ModalProps } from "./modal.types";
import "./modal.scss";

const ModalBack: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const { animation, handleClose, handleNavigate } = useModal(
        isOpen,
        onClose,
        "/study"
    );

    return isOpen ? (
        <div className="modal-overlay">
            <div className={`modal-space ${animation}`}>
                <div className="modal-wrap">
                    <div className="modal-content">
                        <div className="modal-text">정말 나가시겠습니까?</div>
                        <div className="modal-close">
                            <div className="close-btn" onClick={handleClose}>
                                취소
                            </div>
                            <div
                                className="close-btn"
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
