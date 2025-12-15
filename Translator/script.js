const fromText = document.querySelector(".from-text");
const selectTag = document.querySelectorAll("select");
const translatebtn = document.querySelector("button");
const ToText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let isSelected =
      (id === 0 && country_code === "en-GB") ||
      (id === 1 && country_code === "hi-IN")
        ? "selected"
        : "";
    let option = `<option value="${country_code}" ${isSelected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});
exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value;
  tempLanguage = selectTag[0].value;
  fromText.value = ToText.value;
  selectTag[0].value = selectTag[1].value;
  ToText.value = tempText;
  selectTag[1].value = tempLanguage;
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(ToText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(ToText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});

translatebtn.addEventListener("click", () => {
  let text = encodeURIComponent(fromText.value.trim());
  if (!text) {
    ToText.value = "Please enter text to translate.";
    return;
  }
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;

  ToText.value = "Translating...";

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      ToText.value = data.responseData.translatedText;
    })
    .catch((err) => {
      ToText.value = "An error occurred while translating. Please try again.";
      console.error(err);
    });
});
