"use strict";
(() => {
    const initialize = () => {
        const goToStudyButton = document.getElementById('goToStudy');
        if (goToStudyButton && !goToStudyButton.dataset.listenerAdded) {
            goToStudyButton.addEventListener('click', () => {
                console.log('Button clicked! Navigating to study');
                location.hash = 'study';
            });
            goToStudyButton.dataset.listenerAdded = 'true';
        }
        else {
            console.log('Button not found or already initialized.');
        }
    };
    initialize();
})();
