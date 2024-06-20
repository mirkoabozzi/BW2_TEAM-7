const progress = document.getElementById("progress-bar");
const playBtn = document.getElementById("playBtn");
const song = document.getElementById("song");
const totDuration = document.getElementById("totDuration");
const currentDuration = document.getElementById("currentDuration");
const progressContainer = progress.parentElement;


//-------------------GESTIONE PROGRESS BAR-------------------------------
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

// Evelent listeners per rilevare il dragging del mouse sulla barra
let isProgressDragging = false;

progressContainer.addEventListener("mousedown", (e) => {
  isProgressDragging = true;
  updateProgress(e);
});

document.addEventListener("mousemove", (e) => {
  if (isProgressDragging) {
    updateProgress(e);
  }
});

document.addEventListener("mouseup", () => {
  isProgressDragging = false;
});

 //funzione per muovere la barra al click/drag
function updateProgress(e) {
  const rect = progressContainer.getBoundingClientRect(); // Ottiene le dimensioni e la posizione del contenitore del progress
  const offsetX = e.clientX - rect.left;      // Calcola la posizione orizzontale del click rispetto al contenitore del progress
  const width = rect.width;   // Ottiene la larghezza del contenitore del progress
  const percentage = Math.min(Math.max(0, offsetX / width), 1); //Calcola la percentuale di progresso, assicurandosi che sia tra 0 e 1
  const duration = song.duration;    // Ottiene la durata totale della canzone
  song.currentTime = percentage * duration; 
  progress.style.width = `${percentage * 100}%`; // Imposta il tempo corrente della canzone in base alla percentuale di progress
  currentDuration.textContent = durationConverter(song.currentTime); // Aggiorna il testo che mostra la durata corrente della canzone
}

song.addEventListener("ended", () => {  //a canzone finita sostituisce l'icona pausa con l'icona play e riassegna le classi
  playBtn.classList.remove("playing");
  playBtn.classList.add("paused");
  playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px"
    height="20px" class="Svg-sc-ytk21e-0 dYnaPI">
    <path
      d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
    </path>
  </svg>`;
});

//--------------------GESTIONE VOLUME BAR----------------------------------------
const volumeBar = document.getElementById("volume-bar");
const volumeContainer = volumeBar.parentElement;
let isVolumeDragging= false;

volumeContainer.addEventListener("mousedown", (e) => {
  isVolumeDragging = true;
  updateVolume(e);
});

document.addEventListener("mousemove", (e) => {
  if (isVolumeDragging) {
    updateVolume(e);
  }
});

document.addEventListener("mouseup", () => {
  isVolumeDragging = false;
});

function updateVolume(e) {
  const rect = volumeContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;
  const percentage = Math.min(Math.max(0, offsetX / width), 1);
  song.volume = percentage;
  volumeBar.style.width = `${percentage * 100}%`;
}