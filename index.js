const wrapper = document.querySelector(".wrapper")
let searchInput = wrapper.querySelector("input")
let infoText = wrapper.querySelector(".info-text")
let synonyms = wrapper.querySelector(".synonyms .list")
let volumeIcon = document.querySelector(".word i")
let audios;
let removeIcon = document.querySelector(".search .bi");



function data(result, word) {
    if(result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>${word}</span>. Please, try to search for another word`;
    } else {
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let example = result[0].meanings[2].definitions[0].example;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[1].text}`;
        document.querySelector(".meaning span").innerText = definitions.definition;
        if(result[0].meanings[2].definitions[0].example === undefined) {
            example = `Hello and it is ${word}`
        }
        document.querySelector(".example span").innerText = example;
        audios =  new Audio(result[0].phonetics[2].audio);
        if(definitions.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        }else {
            synonyms.parentElement.style.display = "block";
            for (let i = 0; i < definitions.synonyms.length; i++) {
                let synonym = `<span>${definitions.synonyms[i]}</span>`;
                synonyms.insertAdjacentHTML("beforeend", synonym);
            }
        }
         
    }

}

function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "black";
    infoText.innerHTML = `Searching the meaning of the <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(resp => resp.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e=>{
    if(e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", ()=> {
    audios.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.innerHTML = "";
})
