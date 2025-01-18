"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loadPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const appDiv = document.getElementById('app');
    try {
        const response = yield fetch(`pages/${page}/${page}.html`);
        if (!response.ok)
            throw new Error('Page not found');
        appDiv.innerHTML = yield response.text();
        // 페이지에 해당하는 JavaScript 파일 로드
        const script = document.createElement('script');
        script.src = `pages/${page}/${page}.js`;
        script.defer = true;
        document.body.appendChild(script);
        console.log(`${page}.js loaded`);
    }
    catch (error) {
        console.error(`Error loading ${page}:`, error);
        appDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
});
// 기본 로드 및 hashchange 처리
window.addEventListener('load', () => {
    const page = location.hash.replace('#', '') || 'login';
    loadPage(page);
});
window.addEventListener('hashchange', () => {
    const page = location.hash.replace('#', '') || 'login';
    loadPage(page);
});
