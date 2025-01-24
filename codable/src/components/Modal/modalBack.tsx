import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.scss";

interface ModalBackProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalBack: React.FC<ModalBackProps> = ({ isOpen, onClose }) => {
    const [animation, setAnimation] = useState<"slide-in" | "slide-out">(
        "slide-in"
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setAnimation("slide-in");
        }
    }, [isOpen]);

    const handleClose = (): void => {
        setAnimation("slide-out");
        setTimeout(onClose, 500);
    };

    const handleNavigateToStudy = (): void => {
        setAnimation("slide-out");
        setTimeout(() => {
            onClose();
            navigate("/study");
        }, 500);
    };

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
                                onClick={handleNavigateToStudy}
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
