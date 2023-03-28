const container = document.querySelector('.container')
const image = document.querySelector('#music-image')
const title = document.querySelector('#music-details .title')
const singer = document.querySelector('#music-details .singer')
const prev = document.querySelector('#controls #prev')
const play = document.querySelector('#controls #play')
const next = document.querySelector('#controls #next')


const player = new MusicPlayer(musicList);

window.addEventListener('load', () =>  {
    let music = player.getMusic();
    displayMusic(music)
})

function displayMusic(music){
    title.innerText = music.getName();
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener('click',  () =>  {
    audio.play()
    const isMusicPlay = container.classList.contains('playing')
    isMusicPlay ? pauseMusic() : playMusic();
})

function pauseMusic(){
    container.classList.remove('playing');
    audio.pause();
    play.classList = "fa-solid fa-play";
}
function playMusic(){
    container.classList.add('playing');
    play.classList = "fa-solid fa-pause";
    audio.play();
}

prev.addEventListener('click', () => {
    prevMusic();
})
next.addEventListener('click', () => {
    nextMusic();
})

function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}
function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}