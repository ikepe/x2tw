// 置換対象の文字と置換後の文字を定義します。
const search = "𝕏";
const replace = "Twitter";

// ツイート本文を特定するためのクラス名
const tweetTextClass = "r-1tl8opc";

// ページ内のツイート本文を置換する関数
function replaceTweetText() {
  const tweetTextElements = document.querySelectorAll(`.${tweetTextClass}`);
  tweetTextElements.forEach(element => {
    element.textContent = element.textContent.replace(new RegExp(search, "g"), replace);
  });
}

// Twitterのページが読み込まれたときにテキストを置換
if (window.location.href.startsWith("https://twitter.com/")) {
  replaceTweetText();
}

// ページが変更されたときにもテキストを置換
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === "childList" && mutation.target.nodeType === Node.ELEMENT_NODE) {
      replaceTweetText();
    }
  });
});

const observerConfig = {
  subtree: true,
  childList: true,
};

observer.observe(document.body, observerConfig);
