// 여러 언어에서 '관련 콘텐츠'에 해당하는 텍스트 목록
const relatedContentTexts = {
  ko: "관련 콘텐츠", // 한국어
  en: "Related", // 영어
  ja: "関連コンテンツ", // 일본어
  es: "Contenido relacionado", // 스페인어
  fr: "Contenu associé", // 프랑스어
  // 필요시 추가
};

// 브라우저의 기본 언어를 가져옴
const userLang = navigator.language.slice(0, 2); // 언어 코드 (예: "ko", "en" 등)

// 기본적으로 한국어로 설정하되, 다른 언어 코드가 있는 경우 그 언어로 적용
const relatedContentText =
  relatedContentTexts[userLang] || relatedContentTexts["ko"];

// '관련 콘텐츠' 버튼을 찾고 클릭하는 함수
function clickRelatedContentTab() {
  const interval = setInterval(() => {
    // 모든 탭 요소를 탐색하여 텍스트가 일치하는지 확인
    const relatedTab = [
      ...document.querySelectorAll("yt-chip-cloud-chip-renderer"),
    ].find((tab) => {
      const textElement = tab.querySelector("#text");
      return (
        textElement && textElement.textContent.includes(relatedContentText)
      );
    });

    if (relatedTab) {
      relatedTab.click(); // '관련 콘텐츠' 탭을 클릭
      clearInterval(interval); // 작업 완료 시 반복 종료
    }
  }, 1000); // 1초 간격으로 확인
}

// URL 변경을 감지하는 함수
function onUrlChange(callback) {
  let oldHref = document.location.href;

  const body = document.querySelector("body");
  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      callback(); // URL이 변경되면 콜백 실행
    }
  });

  observer.observe(body, { childList: true, subtree: true });
}

// 초기 로드 및 URL 변경 시 호출
window.addEventListener("load", function () {
  clickRelatedContentTab(); // 페이지 로드 시 실행
  onUrlChange(() => {
    clickRelatedContentTab(); // URL 변경 시 실행
  });
});
