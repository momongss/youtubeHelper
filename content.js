// content.js
function clickRelatedVideosButton(event, info) {
  const container = document.querySelector(
    "#container.style-scope.yt-chip-cloud-renderer"
  );
  console.log(container);
  if (container) {
    const buttons = container.querySelectorAll("yt-chip-cloud-chip-renderer");
    console.log(buttons);
    buttons.forEach((button) => {
      const textElement = button.querySelector("#text");
      console.log(
        textElement.textContent.trim(),
        textElement.textContent.trim() === "관련 콘텐츠"
      );
      if (textElement && textElement.textContent.trim() == "관련 콘텐츠") {
        console.log("click");
        button.click();
      }
    });
  }
}

function onPageLoad() {
  if (document.readyState === "complete") {
    console.log("action");
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
