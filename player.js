// select DOM element such as audio, music title, buttons, image, and progressbar.
const musicContainer = document.getElementById('music-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const title = document.getElementById('title');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

// define a array of the name of the songs Must match the original name!

const songs = ["Haunted", "Tell Em", "GOH"];

// also we want to know which track is playing so that we can apply prev, next and play

let songIndex = 2; //because we have 3 songs (0, 1, 2)

// functions

loadSongs(songs[songIndex]);
// play song(make the img rotate and add some changes to button, doesnt play anything in here!)
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    // simply when we want the song to be played...
    audio.play();
}
// load songs , show the title of the song and update the cover
function loadSongs(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}
// prev , next and pause song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSongs(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSongs(songs[songIndex]);
    playSong();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}
// now for making the progress ba dynamic

// for updating progressBar
function updateProgress(e) {
    // console.log(e);
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
// for setting the progressBar
function setProgress(e) {
    console.log(e);

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


// event listeners

playBtn.addEventListener('click', () => {
    const isPlating = musicContainer.classList.contains('play');
    if(isPlating) {
        pauseSong()
    }else{
        playSong();
    }
})
// for changing the songs

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// update the time of the song

progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', nextSong);

