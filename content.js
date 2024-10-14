// 여러 언어에서 각 옵션에 해당하는 텍스트 목록
const optionTexts = {
  모두: {
    ko: "모두",
    en: "All",
    ja: "すべて",
    es: "Todo",
    fr: "Tous",
  },
  "관련 콘텐츠": {
    ko: "관련 콘텐츠",
    en: "Related",
    ja: "関連コンテンツ",
    es: "Contenido relacionado",
    fr: "Contenu associé",
  },
  추천: {
    ko: "추천",
    en: "Recommended",
    ja: "おすすめ",
    es: "Recomendado",
    fr: "Recommandé",
  },
  "최근에 업로드된 동영상": {
    ko: "최근에 업로드된 동영상",
    en: "Recently uploaded",
    ja: "最近アップロードされた動画",
    es: "Recientemente subido",
    fr: "Récemment téléversé",
  },
  "감상한 동영상": {
    ko: "감상한 동영상",
    en: "Watched videos",
    ja: "視聴した動画",
    es: "Videos vistos",
    fr: "Vidéos regardées",
  },
};

// 브라우저의 기본 언어를 가져옴
const userLang = navigator.language.slice(0, 2); // 언어 코드 (예: "ko", "en" 등)

// 다국어에 맞는 텍스트를 반환하는 함수
function getLocalizedText(optionKey) {
  const localizedText = optionTexts[optionKey][userLang];
  return localizedText || optionTexts[optionKey]["ko"]; // 기본은 한국어
}

// 기본 탭을 저장하는 함수
function setDefaultTab(tabText) {
  localStorage.setItem("defaultTab", tabText); // 로컬 스토리지에 선택한 탭 텍스트 저장
}

// 기본 탭을 가져오는 함수
function getDefaultTab() {
  return localStorage.getItem("defaultTab");
}

// Shorts 페이지인지 확인하는 함수
function isShortsPage() {
  return window.location.href.includes("/shorts/");
}

// 유튜브 영상 재생 페이지인지 확인하는 함수
function isWatchPage() {
  return window.location.href.includes("/watch");
}

// 버튼을 클릭하는 함수
function clickDefaultTab() {
  const defaultTabText = getDefaultTab();
  if (!defaultTabText) return; // 기본 설정이 없으면 동작하지 않음

  const defaultTab = [
    ...document.querySelectorAll("yt-chip-cloud-chip-renderer"),
  ].find((tab) => {
    const textElement = tab.querySelector("#text");
    return textElement && textElement.textContent.includes(defaultTabText);
  });

  if (defaultTab && defaultTab.getAttribute("aria-selected") !== "true") {
    setTimeout(() => {
      defaultTab.click(); // 일정 시간 후 버튼 클릭
    }, 1000); // 1초 딜레이 후 실행
  }
}

// 사용자가 클릭한 탭을 기본 탭으로 저장하는 함수
function setupTabClickListener() {
  const tabs = document.querySelectorAll("yt-chip-cloud-chip-renderer");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const textElement = tab.querySelector("#text");
      if (textElement) {
        setDefaultTab(textElement.textContent); // 탭 클릭 시 기본 탭으로 설정
      }
    });
  });
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
  if (isWatchPage() && !isShortsPage()) {
    clickDefaultTab(); // 페이지 로드 시 기본 탭 클릭
    setupTabClickListener(); // 탭 클릭 리스너 설정
  }

  onUrlChange(() => {
    if (isWatchPage() && !isShortsPage()) {
      setTimeout(() => {
        clickDefaultTab(); // URL 변경 후 1초 딜레이 후 기본 탭 클릭
      }, 2000); // 딜레이 적용
      setupTabClickListener(); // URL 변경 시에도 탭 클릭 리스너 다시 설정
    }
  });
});
