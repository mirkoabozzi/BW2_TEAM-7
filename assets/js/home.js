const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=san_pacho";
const url2 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=hugel";
const url3 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=wade";

const playlistArray = [25, 50, 1220, 2500, 5650, 6500, 3250, 4760, 450, 9850];

const randomPlaylist = Math.floor(Math.random() * playlistArray.length);

const playlistUrl = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + playlistArray[randomPlaylist];

console.log(randomPlaylist);

const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const playlistRow = document.getElementById("playlistRow");

fetchSong = async (url, options, row) => {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
  songs = result.data;
  let songIndex = [];

  for (let index = 0; index <= 5; index++) {
    let randomSong = Math.floor(Math.random() * songs.length);

    const verifyIndex = () => {
      let check;
      songIndex.forEach((element) => {
        if (element === randomSong) {
          randomSong = Math.floor(Math.random() * songs.length);
          check++;
        }
      });
      return check;
    };

    do {
      verifyIndex();
    } while (verifyIndex() === 0);

    // console.log(randomSong);

    songIndex.push(randomSong);
    // console.log(songIndex);

    const song = songs[randomSong];

    const col = document.createElement("div");
    col.classList.add("col");
    // if (index === 5) {
    //   col.classList.add("d-lg-none");
    // }
    // if (index === 4) {
    //   col.classList.add("d-md-none");
    // }

    const card = document.createElement("div");
    card.classList.add("card", "border-0");
    // card.style.width = "180px";

    const divPic = document.createElement("div");
    divPic.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.classList.add("bd-placeholder-img", "img-fluid", "p-2");
    pic.style.cursor = "pointer";
    pic.style.objectFit = "contain";

    pic.setAttribute("src", song.album.cover);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const artist = document.createElement("h5");
    artist.classList.add("card-title", "text-truncate");
    artist.style.cursor = "pointer";
    artist.innerText = song.artist.name;

    const title = document.createElement("p");
    title.classList.add("card-text", "text-truncate");
    title.innerText = song.title;
    title.style.cursor = "pointer";

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
    playBtn.classList.add("btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "position-absolute", "bottom-0", "end-0", "d-none", "p-2");

    col.addEventListener("mouseover", (e) => {
      playBtn.classList.remove("d-none");
      card.classList.add("shadow-lg");
    });
    col.addEventListener("mouseout", (e) => {
      playBtn.classList.add("d-none");
      card.classList.remove("shadow-lg");
    });

    divPic.appendChild(playBtn);

    cardBody.appendChild(artist);
    cardBody.appendChild(title);

    divPic.appendChild(pic);
    card.appendChild(divPic);
    card.appendChild(cardBody);

    col.appendChild(card);

    row.appendChild(col);
  }

  songIndex = [];
};

const fetchPlaylist = async (playlistUrl, options) => {
  try {
    const response = await fetch(playlistUrl, options);
    const playlist = await response.json();
    console.log(playlist);

    playlistArray.forEach((element) => {
      const col = document.createElement("div");
      col.classList.add("col-6", "col-lg-4", "my-1");

      const divFlex = document.createElement("div");
      divFlex.classList.add("d-flex", "align-items-center");

      const picContainer = document.createElement("div");
      // picContainer.classList.add("position-relative");

      const pic = document.createElement("img");
      pic.setAttribute("src", playlist.picture_small);

      const titleContainer = document.createElement("div");
      titleContainer.classList.add("ms-2", "me-auto");

      const title = document.createElement("p");
      title.innerText = playlist.title;

      const playBtn = document.createElement("button");
      playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
      playBtn.classList.add("btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "bottom-0", "end-0", "d-none", "p-2");

      col.addEventListener("mouseover", (e) => {
        playBtn.classList.remove("d-none");
        col.classList.add("shadow-lg");
      });
      col.addEventListener("mouseout", (e) => {
        playBtn.classList.add("d-none");
        col.classList.remove("shadow-lg");
      });

      titleContainer.appendChild(title);

      picContainer.appendChild(pic);
      // picContainer.appendChild(playBtn);

      divFlex.appendChild(picContainer);
      divFlex.appendChild(titleContainer);
      divFlex.appendChild(playBtn);

      col.appendChild(divFlex);

      playlistRow.appendChild(col);
    });
  } catch (error) {
    console.error(error);
  }
};

const resizeCheck = () => {
  if (screen.width) {
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b9eade08ffmshc181240ed36d6a3p114651jsn1ec062420e35",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    fetchSong(url, options, row1);
    fetchSong(url2, options, row2);
    fetchSong(url3, options, row3);
    fetchPlaylist(playlistUrl, options);
  } catch (error) {
    console.error(error);
  }
});
