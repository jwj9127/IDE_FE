import { useState, useEffect } from "react";

export const useModal = (
    isOpen: boolean,
    onClose: () => void,
    navigateTo?: string
) => {
    const [animation, setAnimation] = useState<"slide-in" | "slide-out">(
        "slide-in"
    );

    useEffect(() => {
        // 모달이 열릴 때 항상 "slide-in" 상태로 초기화
        if (isOpen) {
            setAnimation("slide-in");
        }
    }, [isOpen]);

    const handleClose = (): void => {
        setAnimation("slide-out");
        setTimeout(onClose, 500);
    };

    const handleNavigate = (navigate: (path: string) => void): void => {
        setAnimation("slide-out");
        setTimeout(() => {
            if (navigateTo) {
                navigate(navigateTo);
            }
            onClose();
        }, 500);
    };

    return {
        animation,
        handleClose,
        handleNavigate,
    };
};
