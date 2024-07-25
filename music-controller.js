import { apiCall } from "./api-client.js";

function getValue() {
  const value = document.getElementById("artistInput").value;
  console.log(value);
  loadData(value);
}

const myButton = document.getElementById("getResultButton");
myButton.addEventListener("click", getValue);

async function loadData(value) {
  const URL = `https://itunes.apple.com/search?term=${value}&limit=10`;
  try {
    const response = await apiCall(URL);
    const obj = await response.json();
    // console.log(obj.results[0].previewUrl);
    // console.log(typeof obj.results)
    console.log(obj.results);
    // console.log(obj.results[0].artistId);
    loadMusic(obj.results);
  } catch (err) {
    console.log("Invalid Error");
  }
}

function loadMusic(artist) {
  for (var i = 0; i < artist.length; i++) {
    loadAudios(artist[i], true);
  }
  const btn = document.querySelectorAll(".to-playlist");

  for (var i = 0; i < btn.length; i++) {
    console.log(btn[i]);
    btn[i].addEventListener("click", (event) => {
      console.log(event);
      let songURL = event.target.getAttribute("url");
      console.log(songURL);
      loadAudios(songURL, false);
    });
  }
}

function loadAudios(singleSong,param) {
  const audioDisplayDiv = document.createElement("div");
  audioDisplayDiv.className = "flex align-items-c";
  const audioDisplay = document.createElement("audio");
  audioDisplay.controls = true;
  audioDisplay.align = "center";
  const nextButton = document.createElement("button");
  nextButton.className = "to-playlist";
  nextButton.innerText = ">";
  nextButton.style.height = "25px";
  nextButton.style.width = "25px";
  nextButton.setAttribute("url", singleSong.previewUrl);
  const audioDisplaySource = document.createElement("source");

  param == true
    ? (audioDisplaySource.src = singleSong.previewUrl)
    : (audioDisplaySource.src = singleSong);

  audioDisplay.appendChild(audioDisplaySource);
  const mainAudioDiv = document.getElementById("audio-display");
  console.log(mainAudioDiv);

  const playlistAudioDiv = document.getElementById("playlist-display");
  // playlistAudioDiv.innerText = 'hey';
  // mainAudioDiv.appendChild(audioDisplay);
  // mainAudioDiv.appendChild(nextButton);


  audioDisplayDiv.appendChild(audioDisplay);
  audioDisplayDiv.appendChild(nextButton);
  // mainAudioDiv.appendChild(audioDisplayDiv);

  param == true
    ? mainAudioDiv.appendChild(audioDisplayDiv)
    : playlistAudioDiv.appendChild(audioDisplayDiv);
  param == true
    ? (nextButton.style.display = "block")
    : (nextButton.style.display = "none");

  audioDisplayDiv.style.margin = "0px auto";
  mainAudioDiv.style.width = "40%";
}

function songToPlaylist(singleSong) {
  //   console.log("hey");
  //   const mainAudioDiv = document.getElementById("playlist-display");
  //   const h1 = document.createElement('h1');
  //   h1.innerText = 'ok';
  //   mainAudioDiv.appendChild(h1);
}
