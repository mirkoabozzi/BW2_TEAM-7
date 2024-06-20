const params = new URLSearchParams(window.location.search);
const id = params.get("spotifyId");
const url = "https://deezerdevs-deezer.p.rapidapi.com/album/" + id;
const rigaTracce = document.getElementById("rigaTracce");
const rigaImmagineTitolo = document.getElementById("rigaImmagineTitolo");
const rigaImmagineArtistaPlayer = document.getElementById(
  "rigaImmagineArtistaPlayer"
);

function convertitoreDurationASecondi(duration) {
  const minuti = Math.floor(duration / 60);
  const secondi = duration % 60;
  const tempo = minuti + ":" + (secondi < 10 ? "0" : "") + secondi;
  return tempo;
}

fetchAlbum = async (
  url,
  options,
  rigaTracce,
  rigaImmagineTitolo,
  rigaImmagineArtistaPlayer
) => {
  const response = await fetch(url, options);
  const album = await response.json();
  const brani = album.tracks.data;
  console.log(brani);
  console.log(album);

  //immagine album
  const colonnaImmagine = document.createElement("div");
  colonnaImmagine.classList.add(
    "col-sm-12",
    "col-md-12",
    "col-lg-5",
    "col-xl-4",
    "col-xxl-3",
    "my-1",
    "text-center"
  );
  colonnaImmagine.innerHTML = `<img
                      src= ${album.cover_medium}
                      alt=""
                      width="300px"
                      height="300px"
                      class="img-fluid shadow-lg"
                    />`;

  // titolo album
  const colonnaTitoloAlbum = document.createElement("div");
  colonnaTitoloAlbum.classList.add(
    "col-sm-12",
    "col-md-12",
    "col-lg-7",
    "col-xl-8",
    "col-xxl-9",
    "my-1"
  );
  const h6 = document.createElement("h6");
  h6.innerText = "ALBUM";
  const h1 = document.createElement("h1");
  h1.classList.add("fw-semibold");
  h1.innerText = `${album.title}`;

  //immagine artista, anno, numero brani, durata totale
  const colonnaImmagineArtista = document.createElement("div");
  colonnaImmagineArtista.classList.add("d-flex", "align-items-center", "pt-4");
  colonnaImmagineArtista.innerHTML = `
                      <div>
                        <img
                          src= ${album.artist.picture_medium}
                          alt="artista"
                          width="35px"
                          height="35px"
                          class="rounded-5"
                        />
                      </div>
                      <div class="ms-2">
                        <p class="mb-0">
                          ${album.artist.name} &bull; ${album.release_date} &bull; ${album.nb_tracks} brani,
                          <span>${album.duration} secondi</span>
                        </p>
                      </div>
                    </div>`;
  colonnaTitoloAlbum.appendChild(h6);
  colonnaTitoloAlbum.appendChild(h1);
  rigaImmagineTitolo.appendChild(colonnaImmagine);
  rigaImmagineTitolo.appendChild(colonnaTitoloAlbum);
  rigaImmagineTitolo.appendChild(colonnaImmagineArtista);

  //ciclo for per le tracce
  for (let index = 0; index < brani.length; index++) {
    // console.log("album", album);

    //colonna numero traccia
    const numeroTraccia = document.createElement("div");
    numeroTraccia.classList.add(
      "col-1",
      "col-xxl-1",
      "text-center",
      "d-none",
      "d-lg-block"
    );
    const span = document.createElement("span");
    span.innerText = index + 1;

    // colonna titolo e artista
    const colonnaTitoloArtista = document.createElement("div");
    colonnaTitoloArtista.classList.add(
      "col-11",
      "col-sm-11",
      "col-md-11",
      "col-lg-2",
      "col-xl-2",
      "col-xxl-2"
    );
    const titolo = document.createElement("h4");
    titolo.innerText = brani[index].title;
    const artista = document.createElement("span");
    artista.innerText = brani[index].artist.name;

    // colonna numero di riproduzioni
    const riproduzioni = document.createElement("div");
    riproduzioni.classList.add(
      "col-8",
      "col-xxl-8",
      "text-center",
      "d-none",
      "d-lg-block"
    );
    const numeroRiproduzioni = document.createElement("span");
    numeroRiproduzioni.innerText = brani[index].rank.toLocaleString();

    // colonna durata traccia
    const tempo = document.createElement("div");
    tempo.classList.add("col-1", "col-xxl-1", "d-none", "d-lg-block");
    const durataTraccia = document.createElement("span");
    durataTraccia.innerText = convertitoreDurationASecondi(
      brani[index].duration
    );

    // colonna svg pallini in modalità mobile
    const colonnaPallini = document.createElement("div");
    colonnaPallini.classList.add("col-1", "d-lg-none");
    colonnaPallini.innerHTML = `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
                      ></path>
                    </svg>`;

    //appendchild degli elementi

    tempo.appendChild(durataTraccia);
    riproduzioni.appendChild(numeroRiproduzioni);
    colonnaTitoloArtista.appendChild(titolo);
    colonnaTitoloArtista.appendChild(artista);
    numeroTraccia.appendChild(span);
    rigaTracce.appendChild(numeroTraccia);
    rigaTracce.appendChild(colonnaTitoloArtista);
    rigaTracce.appendChild(riproduzioni);
    rigaTracce.appendChild(tempo);
    rigaTracce.appendChild(colonnaPallini);
  }
  //immagine album player
  const colonnaImmaginePlayer = document.createElement("div");
  colonnaImmaginePlayer.classList.add(
    "col-5",
    "col-sm-5",
    "col-md-4",
    "col-lg-3",
    "col-xl-3",
    "col-xxl-2",
    "text-center",
    "pe-0"
  );
  colonnaImmaginePlayer.innerHTML = `<img
                src= ${album.artist.picture_medium}
                alt="album"
                width="56px"
                height="56px"
                class="img-fluid"
              />`;
  // titolo e artista player
  const colonnaTitoloArtistaPlayer = document.createElement("div");
  colonnaTitoloArtistaPlayer.classList.add(
    "col-4",
    "col-sm-4",
    "col-md-4",
    "col-lg-4",
    "col-xl-4",
    "col-xxl-4",
    "pe-0"
  );
  colonnaTitoloArtistaPlayer.innerHTML = `<h6 class="m-0">${album.title}</h6>
              <span class="m-0 d-none d-lg-block">${album.artist.name}</span>`;

  const bottoneCuore = document.createElement("div");
  bottoneCuore.classList.add(
    "col-lg-1",
    "col-xl-1",
    "col-xxl-1",
    "px-0",
    "d-none",
    "d-lg-block"
  );
  bottoneCuore.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                ></path>
              </svg>`;

  rigaImmagineArtistaPlayer.appendChild(colonnaImmaginePlayer);
  rigaImmagineArtistaPlayer.appendChild(colonnaTitoloArtistaPlayer);
  rigaImmagineArtistaPlayer.appendChild(bottoneCuore);
};

window.addEventListener("DOMContentLoaded", async () => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "50327805edmshfb4c0cc220216e2p184b40jsnc80dc219e365",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    fetchAlbum(
      url,
      options,
      rigaTracce,
      rigaImmagineTitolo,
      rigaImmagineArtistaPlayer
    );
  } catch (error) {
    console.error(error);
  }
});
