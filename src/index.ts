const loadPage = async (page: string) => {
  const appDiv = document.getElementById('app')!;
  try {
    const response = await fetch(`pages/${page}/${page}.html`);
    if (!response.ok) throw new Error('Page not found');
    appDiv.innerHTML = await response.text();

    // 페이지에 해당하는 JavaScript 파일 로드
    const script = document.createElement('script');
    script.src = `pages/${page}/${page}.js`;
    script.defer = true;
    document.body.appendChild(script);

    console.log(`${page}.js loaded`);
  } catch (error) {
    console.error(`Error loading ${page}:`, error);
    appDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
  }
};

// 기본 로드 및 hashchange 처리
window.addEventListener('load', () => {
  const page = location.hash.replace('#', '') || 'login';
  loadPage(page);
});

window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '') || 'login';
  loadPage(page);
});
