const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  console.log(inpWord);
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetics[0]}/</p>
          <p>${data[0].meanings[0].synonyms[0]}/</p>
        </div>

        <div class="word-details">
          <p class="word-meaning">
            1. ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-meaning">
            2. ${data[0].meanings[1].definitions[0].definition}
          </p>
          <p class="word-meaning">
            3. ${data[0].meanings[2].definitions[0].definition}
          </p>
          <p class="word-meaning">
            <a href="${data[0].sourceUrls[0]}">${data[0].sourceUrls[0]}</a>
          </p>
          <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
          </p>
        </div>
      `;

      sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});
function playSound() {
  sound.play();
}
