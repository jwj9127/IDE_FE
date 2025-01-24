import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.scss";

const ModalBack: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const [animation, setAnimation] = useState("slide-in");
    const navigate = useNavigate();

    useEffect(() => {
        // 모달이 열릴 때 항상 "slide-in" 상태로 초기화
        if (isOpen) {
            setAnimation("slide-in");
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimation("slide-out"); // 사라지는 애니메이션 실행
        setTimeout(onClose, 500); // 애니메이션 시간 이후 모달 닫기
    };

    const handleNavigateToStudy = () => {
        setAnimation("slide-out"); // 사라지는 애니메이션 실행
        setTimeout(() => {
            navigate("/study"); // /study 경로로 이동
            onClose(); // 모달 닫기
        }, 500); // 애니메이션 완료 후 동작
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
