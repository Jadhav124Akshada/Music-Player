const songs = [
    { title: "Mazya Raha R", file: "song1.mp3", image: "mazya_raha_r.jpg" },
    { title: "Ishq Hai", file: "song2.mp3", image: "ishq_hai.jpg" },
    { title: "Mitwa", file: "song3.mp3", image: "mitwa.jpg" },
    { title: "Sahiba", file: "song4.mp3", image: "sahiba.jpg" },
    { title: "Tola Tola", file: "song5.mp3", image: "tola_tola.jpg" },
    { title: "Jeene Laga Hoon", file: "song6.mp3", image: "jeene_laga_hoon.jpg" },
    { title: "Tu Hain To", file: "song7.mp3", image: "tu_hain_to.jpg" },
    { title: "Chahun Main Ya Na", file: "song8.mp3", image: "chahun_main_ya_na.jpg" },
    { title: "Tera Hoone Laga Hoon", file: "song9.mp3", image: "tera_hoone_laga_hoon.jpg" },
    { title: "Yeh Tune Kya Kiya", file: "song10.mp3", image: "yeh_tune_kya_kiya.jpg" },
    { title: "Tu Hi Mera", file: "song11.mp3", image: "tu_hi_mera.jpg" },
    { title: "Ishq Risk", file: "song12.mp3", image: "ishq_risk.jpg" },
    { title: "Ik Lamha", file: "song13.mp3", image: "ik_lamha.jpg" },
    { title: "Galat Baat", file: "song14.mp3", image: "galat_baat.jpg" },
    { title: "Dhoka", file: "song15.mp3", image: "dhoka.jpg" },
    { title: "Choo Lo", file: "song16.mp3", image: "choo_lo.jpg" },
    { title: "Tum Se Hi", file: "song17.mp3", image: "tum_se_hi.jpg" },
    { title: "Tu Hai Kahan", file: "song18.mp3", image: "tu_hai_kahan.jpg" },
    { title: "Meri Bheegi Bheegi Si", file: "song19.mp3", image: "meri_bheegi_bheegi_si.jpg" },
    { title: "Premika Ne Pyaar Se", file: "song20.mp3", image: "premika_ne_pyaar_se.jpg" },
    { title: "Tere Liye", file: "song21.mp3", image: "tere_liye.jpg" },
    { title: "Mai Agar Kahoon", file: "song22.mp3", image: "mai_agar_kahoon.jpg" },
    { title: "Le Gayi", file: "song23.mp3", image: "le_gayi.jpg" },
    { title: "Aradhya", file: "song24.mp3", image: "aradhya.jpg" },
    { title: "Kakan", file: "song25.mp3", image: "kakan.jpg" }
   
];



let songIndex = 0;

const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const playPauseButton = document.getElementById("playPause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const songImage = document.getElementById("song-image");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const radioButton = document.createElement("div");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// Add radio button to the progress container
radioButton.id = "radio-button";
progressContainer.appendChild(radioButton);

function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    audio.src = song.file;
    songImage.style.backgroundImage = `url(${song.image})`;
    songImage.style.backgroundSize = "cover";
    songImage.style.backgroundPosition = "center";

    progressBar.style.width = "0%";
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";

    audio.addEventListener("loadedmetadata", () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    playSong();
}

function playSong() {
    audio.play();
    playPauseButton.innerHTML = "⏸";
    playPauseButton.nextElementSibling.textContent = "Pause";
}

function pauseSong() {
    audio.pause();
    playPauseButton.innerHTML = "▶";
    playPauseButton.nextElementSibling.textContent = "Play";
}

function togglePlayPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
}

function updateProgressBar() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const progressWidth = progressContainer.clientWidth;
    const radioPosition = (currentTime / duration) * progressWidth;
    radioButton.style.left = `${radioPosition}px`;

    currentTimeDisplay.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function setProgress(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / rect.width) * duration;
}

let isDragging = false;
radioButton.addEventListener("mousedown", () => (isDragging = true));
window.addEventListener("mouseup", () => (isDragging = false));
window.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;

        const newPosition = Math.max(0, Math.min(offsetX, width));
        audio.currentTime = (newPosition / width) * audio.duration;
        updateProgressBar();
    }
});

// Events
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgress);
playPauseButton.addEventListener("click", togglePlayPause);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

loadSong(songIndex);
