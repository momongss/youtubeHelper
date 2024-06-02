// content.js
function clickRelatedVideosButton(event, info) {
  const container = document.querySelector(
    "#container.style-scope.yt-chip-cloud-renderer"
  );

  if (container) {
    const buttons = container.querySelectorAll("yt-chip-cloud-chip-renderer");

    buttons.forEach((button) => {
      const textElement = button.querySelector("#text");
      if (textElement && textElement.textContent.trim() == "관련 콘텐츠") {
        button.click();
      }
    });
  }
}

function onPageLoad() {
  if (document.readyState === "complete") {
    clickRelatedVideosButton();
  } else {
    timeout();
  }
}

function timeout() {
  if (document.readyState === "complete") {
    clickRelatedVideosButton();
  } else {
    setTimeout(timeout, 3000);
  }
}

onPageLoad();
