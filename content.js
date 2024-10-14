// URL 변경을 감지하는 함수
function onUrlChange(callback) {
  let oldHref = document.location.href;

  // URL 변화 감지
  const body = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      callback(); // URL이 변경되면 콜백 실행
    }
  });

  // DOM 변화를 감시하는 옵저버 시작
  observer.observe(body, { childList: true, subtree: true });
}

// '관련 콘텐츠' 버튼을 찾고 클릭하는 함수
function clickRelatedContentTab() {
  const interval = setInterval(() => {
    const relatedTab = [
      ...document.querySelectorAll("yt-chip-cloud-chip-renderer"),
    ].find((tab) =>
      tab.querySelector("#text")?.textContent.includes("관련 콘텐츠")
    );

    if (relatedTab) {
      relatedTab.click(); // '관련 콘텐츠' 탭을 클릭
      clearInterval(interval); // 반복 종료
    }
  }, 500); // 0.5초 간격으로 확인
}

// 초기 로드 시 '관련 콘텐츠' 클릭
window.addEventListener("load", function () {
  clickRelatedContentTab(); // 페이지 로드 시 실행
  onUrlChange(() => {
    clickRelatedContentTab(); // URL 변경 시 실행
  });
});
