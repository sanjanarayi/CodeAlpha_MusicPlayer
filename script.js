const songs = [
{
    title: "Life Goes On",
    artist: "BTS",
    src: "life Goes On.mp3",
    cover: "cover1.jpg"
},
{
    title: "Chemtrails Over the Country Club",
    artist: "Lana Del Rey",
    src: "Chemtrails Over the Country Club.mp3",
    cover: "cover2.jpg"
},
{
    title: "Who Says",
    artist: "Selena Gomez",
    src: "Who Says.mp3",
    cover: "cover3.jpg"
}
];
const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const progress = document.getElementById("progress");

const currentTimeEl =
document.getElementById("currentTime");

const durationEl =
document.getElementById("duration");

const volume =
document.getElementById("volume");

const playlist =
document.getElementById("playlist");

const themeBtn =
document.getElementById("themeBtn");

let currentSong = 0;
let isPlaying = false;

/* LOAD SONG */

function loadSong(index){

    const song = songs[index];

    title.textContent = "🎵 " + song.title;
    artist.textContent = "👤 " + song.artist;

    audio.src = song.src;

    cover.src = song.cover;

    updatePlaylistHighlight();
}

/* PLAY SONG */

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");
}

/* PAUSE SONG */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");
}

/* PLAY / PAUSE */

playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

/* NEXT SONG */

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();
}

nextBtn.addEventListener(
    "click",
    nextSong
);

/* PREVIOUS SONG */

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong =
        songs.length - 1;
    }

    loadSong(currentSong);

    playSong();
}

prevBtn.addEventListener(
    "click",
    prevSong
);

/* AUTO NEXT SONG */

audio.addEventListener(
    "ended",
    nextSong
);

/* PROGRESS BAR */

audio.addEventListener(
    "timeupdate",
    () => {

        if(audio.duration){

            progress.value =
            (audio.currentTime /
            audio.duration) * 100;

            currentTimeEl.textContent =
            formatTime(audio.currentTime);

            durationEl.textContent =
            formatTime(audio.duration);
        }

    }
);

/* SEEK SONG */

progress.addEventListener(
    "input",
    () => {

        audio.currentTime =
        (progress.value / 100)
        * audio.duration;

    }
);

/* FORMAT TIME */

function formatTime(time){

    const minutes =
    Math.floor(time / 60);

    const seconds =
    Math.floor(time % 60);

    return `${minutes}:${
    seconds < 10 ?
    "0" + seconds :
    seconds}`;

}

/* VOLUME */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
        volume.value;

    }
);

/* PLAYLIST */

songs.forEach((song,index)=>{

    const li =
    document.createElement("li");

    li.textContent =
    `${song.title} - ${song.artist}`;

    li.addEventListener(
        "click",
        ()=>{

            currentSong = index;

            loadSong(index);

            playSong();

        }
    );

    playlist.appendChild(li);

});

function updatePlaylistHighlight(){

    const items =
    playlist.querySelectorAll("li");

    items.forEach(item =>
        item.classList.remove(
            "active-song"
        )
    );

    items[currentSong]
    .classList.add(
        "active-song"
    );
}

/* DARK/LIGHT THEME */

themeBtn.addEventListener(
    "click",
    ()=>{

        document.body.classList
        .toggle("light");

        if(
            document.body.classList
            .contains("light")
        ){
            themeBtn.textContent =
            "☀️";
        }
        else{
            themeBtn.textContent =
            "🌙";
        }

    }
);

/* KEYBOARD SHORTCUTS */

document.addEventListener(
    "keydown",
    (e)=>{

        if(e.code === "Space"){

            e.preventDefault();

            if(isPlaying){
                pauseSong();
            }
            else{
                playSong();
            }
        }

        if(e.code === "ArrowRight"){
            nextSong();
        }

        if(e.code === "ArrowLeft"){
            prevSong();
        }

    }
);

/* INITIAL LOAD */

loadSong(currentSong);
