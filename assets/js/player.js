const progress = document.getElementById("progress-bar");
const playBtn = document.getElementById("playBtn");
const song = document.getElementById("song");
const totDuration = document.getElementById("totDuration");
const currentDuration = document.getElementById("currentDuration");
const progressContainer = progress.parentElement;

const playPause = function () {
  if (playBtn.classList.contains("paused")) {
    song.play();
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z">
    </path></svg>`;
    playBtn.classList.remove("paused");
    playBtn.classList.add("playing");
  } else if (playBtn.classList.contains("playing")) {
    song.pause();
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px"
      height="20px" class="Svg-sc-ytk21e-0 dYnaPI">
      <path
        d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
      </path>
    </svg>`;
    playBtn.classList.remove("playing");
    playBtn.classList.add("paused");
  }
};

if (song.play()) {
  console.log("sto suonando");
  let duration = 30;
  setInterval(() => {
    let now = (song.currentTime / duration) * 100;
    currentDuration.textContent = durationConverter(song.currentTime);
    progress.style.width = `${now}% `;
  });
}

function durationConverter(duration) {
  const minuti = Math.floor(duration / 60);
  const secondi = Math.round(duration % 60);
  const tempo = minuti + ":" + (secondi < 10 ? "0" : "") + secondi;
  return tempo;
}

playBtn.addEventListener("click", playPause);

// Add event listeners for dragging the progress bar
let isDragging = false;

progressContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateProgress(e);
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateProgress(e);
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

function updateProgress(e) {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;
  const percentage = Math.min(Math.max(0, offsetX / width), 1);
  const duration = song.duration;
  song.currentTime = percentage * duration;
  progress.style.width = `${percentage * 100}%`;
  currentDuration.textContent = durationConverter(song.currentTime);
}