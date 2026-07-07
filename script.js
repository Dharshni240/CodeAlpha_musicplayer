// ==========================
// SONG LIST
// ==========================

const songs = [
{
    title: "Neon Dreams",
    artist: "Studio Mix",
    src: "songs/song1.mp3",
    cover: "images/img1.png"
},
{
    title: "Golden Sunset",
    artist: "Relax Beats",
    src: "songs/song2.mp3",
    cover: "images/img2.png"
},
{
    title: "Electric Pulse",
    artist: "Night Wave",
    src: "songs/song3.mp3",
    cover: "images/img3.png"
},
{
    title: "Moonlight City",
    artist: "Dream Studio",
    src: "songs/song4.mp3",
    cover: "images/img4.png"
}
];

// ==========================
// SELECT ELEMENTS
// ==========================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

// ==========================
// PLAYER VARIABLES
// ==========================

let currentSong = 0;

let isPlaying = false;

let isShuffle = false;

let isRepeat = false;

// ==========================
// LOAD SONG
// ==========================

function loadSong(index){

    audio.pause();

    audio.src = songs[index].src;

    audio.load();

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;

    cover.src = songs[index].cover;

}
loadSong(currentSong);

// ==========================
// CREATE PLAYLIST
// ==========================

function createPlaylist(){

    playlist.innerHTML = "";

    songs.forEach((song,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
            <span>${song.title}</span>
        `;

        li.onclick=()=>{

            currentSong=index;

            loadSong(currentSong);

            playSong();

            updatePlaylist();

        };

        playlist.appendChild(li);

    });

}

createPlaylist();

// ==========================
// UPDATE PLAYLIST
// ==========================

function updatePlaylist(){

    const items=document.querySelectorAll("#playlist li");

    items.forEach((item,index)=>{

        item.classList.remove("active");

        if(index===currentSong){

            item.classList.add("active");

        }

    });

}
// ==========================
// PLAY SONG
// ==========================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML = '<i class="fas fa-pause"></i>';

    cover.classList.add("rotate");

}

// ==========================
// PAUSE SONG
// ==========================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    cover.classList.remove("rotate");

}

// ==========================
// PLAY / PAUSE BUTTON
// ==========================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }
    else{

        playSong();

    }

});

// ==========================
// NEXT SONG
// ==========================

function nextSong(){

    if(isShuffle){

        let random;

        do{

            random = Math.floor(Math.random() * songs.length);

        }while(random === currentSong);

        currentSong = random;

    }else{

        currentSong++;

        if(currentSong >= songs.length){

            currentSong = 0;

        }

    }

    loadSong(currentSong);

    updatePlaylist();

    playSong();

}

nextBtn.addEventListener("click",nextSong);

// ==========================
// PREVIOUS SONG
// ==========================

function previousSong(){

    currentSong--;

    if(currentSong < 0){

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    updatePlaylist();

    playSong();

}

prevBtn.addEventListener("click",previousSong);
// ==========================
// UPDATE PROGRESS BAR
// ==========================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    // Current Time
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    // Duration
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);

    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }

    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

});

// ==========================
// SEEK SONG
// ==========================

progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime = (progress.value / 100) * audio.duration;

});

// ==========================
// VOLUME CONTROL
// ==========================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// Set default volume

audio.volume = 1;
// ==========================
// SHUFFLE
// ==========================

shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffleBtn.style.color = "#00e5ff";
    } else {
        shuffleBtn.style.color = "#ffffff";
    }

});

// ==========================
// REPEAT
// ==========================

repeatBtn.addEventListener("click", () => {

    isRepeat = !isRepeat;

    audio.loop = isRepeat;

    if (isRepeat) {
        repeatBtn.style.color = "#00e5ff";
    } else {
        repeatBtn.style.color = "#ffffff";
    }

});

// ==========================
// AUTO PLAY NEXT SONG
// ==========================

audio.addEventListener("ended", () => {
    nextSong();
});

        

// ==========================
// KEYBOARD SHORTCUTS
// ==========================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }

    }

    if (e.code === "ArrowRight") {
        nextSong();
    }

    if (e.code === "ArrowLeft") {
        previousSong();
    }

});

// ==========================
// INITIALIZE
// ==========================

updatePlaylist();


