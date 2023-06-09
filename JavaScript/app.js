const container = document.querySelector('.container')
const image = document.querySelector('#music-image')
const title = document.querySelector('#music-details .title')
const singer = document.querySelector('#music-details .singer')
const prev = document.querySelector('#controls #prev')
const play = document.querySelector('#controls #play')
const next = document.querySelector('#controls #next')
const duration = document.querySelector('#duration')
const currentTime = document.querySelector('#current-time')
const progressBar = document.querySelector('#progress-bar')
const volume = document.querySelector('#volume')
const volumeBar = document.querySelector('#volume-bar')
const ul = document.querySelector('ul')


const player = new MusicPlayer(musicList);


window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music)
    displayMusicList(player.musicList)
    isPlayingNow()
})

// Information pulled from music.js

function displayMusic(music) {
    title.innerText = music.getName();
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

// Play function

play.addEventListener('click', () => {
    audio.play()
    const isMusicPlay = container.classList.contains('playing')
    isMusicPlay ? pauseMusic() : playMusic();
})

// pause function

function pauseMusic() {
    container.classList.remove('playing');
    audio.pause();
    play.classList = "fa-solid fa-play bg-primary";
}

// play function addition
function playMusic() {
    container.classList.add('playing');
    play.classList = "fa-solid fa-pause bg-primary";
    audio.play();
}

// prev function

prev.addEventListener('click', () => {
    prevMusic();
})

function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow()
}

// next function


next.addEventListener('click', () => {
    nextMusic();
})


function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow()
}

// arrangement of music

function calculateTime(allSeconds) {
    const minute = Math.floor(allSeconds / 60);
    const second = Math.floor(allSeconds % 60);
    const uptadeSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${uptadeSecond}`
    return result;

}



audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration)
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
})

// progress bar

progressBar.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime = progressBar.value
})

// vulume-bar

let soundStatus = "voice";

volumeBar.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        soundStatus = 'muted';
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        soundStatus = "voice"
        volume.classList = "fa-solid fa-volume-high"
    }
})

volume.addEventListener('click', () => {
    if (soundStatus === "voice") {
        audio.muted = true;
        soundStatus = 'muted';
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0;

    } else {
        audio.muted = false;
        soundStatus = "voice"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100;
    }
})

if (volumeBar.value === 0) {
    volume.classList = "fa-solid fa-volume-xmark"

}

// listMusic display

function displayMusicList(list) {
    for (let i = 0; i < list.length; i++) {
        let liTag = `
        <li onClick="selectedMusic(this)" li-index='${i}' class="list-group-item d-flex justify-content-between align-items-center">
        <span class="h5">${list[i].getName()}</span>
        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration)
        });


    }
}

// list music function plugins

function selectedMusic(li) {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow()
}

function isPlayingNow() {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing")

        }
        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing")
        }
    }
}

// borders edit

function myFunction() {
    const list = document.querySelector(".container").classList;
    list.toggle("rdys");
}
