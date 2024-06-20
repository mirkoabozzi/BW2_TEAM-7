const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=san_pacho";
const url2 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=hugel";
const url3 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=wade";
const url4 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=paco_osuna";
const url5 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=low_steppa";
const url6 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=italobros";
const url7 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=gigi_d'agostinos";
const url8 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=purple_disco_machine";
const url9 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=avicii";
const url10 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=robbie_rivera";
const url11 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=essed";
const url12 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=alesso";

const artistArray = [url, url2, url3, url4, url5, url6, url7, url8, url9, url10, url11, url12];

const albumUrl = "https://deezerdevs-deezer.p.rapidapi.com/album/75621062";
const albumUrl2 = "https://deezerdevs-deezer.p.rapidapi.com/album/299931";
const albumUrl3 = "https://deezerdevs-deezer.p.rapidapi.com/album/299782827";
const albumUrl4 = "https://deezerdevs-deezer.p.rapidapi.com/album/548735872";
const albumUrl5 = "https://deezerdevs-deezer.p.rapidapi.com/album/545453842";
const albumUrl6 = "https://deezerdevs-deezer.p.rapidapi.com/album/584357862";

const playlistArray = [25, 50, 1220, 2500, 5650, 6500, 3250, 4760, 450, 9850, 980, 322];

const randomPlaylists = (array) => {
  const randomNumber = Math.floor(Math.random() * array.length);

  return "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + array[randomNumber];
};

const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const row4 = document.getElementById("row4");

const playlistRow = document.getElementById("playlistRow");

fetchAlbum = async (albumUrl, options, row) => {
  const response = await fetch(albumUrl, options);
  const album = await response.json();
  console.log("album", album);
  // songs = album.tracks.data;
  const response2 = await fetch(albumUrl2, options);
  const album2 = await response2.json();

  const response3 = await fetch(albumUrl3, options);
  const album3 = await response3.json();

  const response4 = await fetch(albumUrl4, options);
  const album4 = await response4.json();

  const response5 = await fetch(albumUrl5, options);
  const album5 = await response5.json();

  const response6 = await fetch(albumUrl6, options);
  const album6 = await response6.json();

  let albums = [album, album2, album3, album4, album5, album6];
  // console.log("albums", albums);

  for (let index = 0; index < albums.length; index++) {
    // console.log("index", albums[index]);
    const col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-lg-3", "col-xl-2");

    col.addEventListener("click", () => {
      window.location.assign("./album.html?spotifyId=" + albums[index].id);
    });
    console.log(album.id);
    // if (index === 5) {
    //   col.classList.add("d-lg-none");
    // }
    // if (index === 4) {
    //   col.classList.add("d-md-none");
    // }

    if (index === 5) {
      col.classList.add("hide-on-xl");
      // console.log("saaaaaas");
    }
    if (index === 4) {
      col.classList.add("hide-on-lg");
    }
    if (index === 3) {
      col.classList.add("hide-on-md");
    }
    if (index === 2) {
      col.classList.add("hide-on-sm");
    }

    const card = document.createElement("div");
    card.classList.add("border-0", "rounded");
    card.style.cursor = "pointer";
    // card.style.width = "180px";

    const divPic = document.createElement("div");
    divPic.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.classList.add("bd-placeholder-img", "card-img-top", "p-2");
    pic.style.objectFit = "contain";

    pic.setAttribute("src", albums[index].cover);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const artist = document.createElement("h5");
    artist.classList.add("card-title", "text-truncate");
    artist.style.cursor = "pointer";
    artist.innerText = albums[index].artist.name;

    const title = document.createElement("p");
    title.classList.add("card-text", "text-truncate");
    title.innerText = albums[index].title;

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
    playBtn.classList.add("playAlbum", "btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "position-absolute", "bottom-0", "end-0", "d-none", "p-2");

    col.addEventListener("mouseover", (e) => {
      playBtn.classList.remove("d-none");
      card.classList.add("shadow-lg", "bg-secondary");
    });
    col.addEventListener("mouseout", (e) => {
      playBtn.classList.add("d-none");
      card.classList.remove("shadow-lg", "bg-secondary");
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
};

fetchSong = async (url, options, row) => {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log("song", result);
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
    col.classList.add("col-6", "col-md-4", "col-lg-3", "col-xl-2");
    // if (index === 5) {
    //   col.classList.add("d-lg-none");
    // }
    // if (index === 4) {
    //   col.classList.add("d-md-none");
    // }
    if (index === 5) {
      col.classList.add("hide-on-xl");
      // console.log("saaaaaas");
    }
    if (index === 4) {
      col.classList.add("hide-on-lg");
    }
    if (index === 3) {
      col.classList.add("hide-on-md");
    }
    if (index === 2) {
      col.classList.add("hide-on-sm");
    }

    const card = document.createElement("div");
    card.classList.add("border-0", "rounded");
    card.style.cursor = "pointer";
    // card.style.width = "180px";

    const divPic = document.createElement("div");
    divPic.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.classList.add("bd-placeholder-img", "card-img-top", "p-2");
    pic.style.objectFit = "contain";

    pic.setAttribute("src", song.album.cover);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const artist = document.createElement("h5");
    artist.classList.add("card-title", "text-truncate");
    artist.innerText = song.artist.name;

    const title = document.createElement("p");
    title.classList.add("card-text", "text-truncate");
    title.innerText = song.title;

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
    playBtn.classList.add("playSong", "btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "position-absolute", "bottom-0", "end-0", "d-none", "p-2");

    col.addEventListener("mouseover", (e) => {
      playBtn.classList.remove("d-none");
      card.classList.add("shadow-lg", "bg-secondary");
    });
    col.addEventListener("mouseout", (e) => {
      playBtn.classList.add("d-none");
      card.classList.remove("shadow-lg", "bg-secondary");
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

fetchPlaylist = async (options) => {
  const response = await fetch(randomPlaylists(playlistArray), options);
  const playlist = await response.json();
  console.log("playlist", playlist);
  // console.log("tracks", playlist.tracks);
  // console.log("data", playlist.tracks.data);

  const response2 = await fetch(randomPlaylists(playlistArray), options);
  const playlist2 = await response2.json();

  const response3 = await fetch(randomPlaylists(playlistArray), options);
  const playlist3 = await response3.json();

  const response4 = await fetch(randomPlaylists(playlistArray), options);
  const playlist4 = await response4.json();

  const response5 = await fetch(randomPlaylists(playlistArray), options);
  const playlist5 = await response5.json();

  const response6 = await fetch(randomPlaylists(playlistArray), options);
  const playlist6 = await response6.json();

  const arrayPlaylists = [playlist, playlist2, playlist3, playlist4, playlist5, playlist6];

  for (let index = 0; index < arrayPlaylists.length; index++) {
    // console.log("playlist index", arrayPlaylists[index]);
    const col = document.createElement("div");
    col.classList.add("col-6", "col-lg-4", "my-1", "rounded");
    col.style.cursor = "pointer";

    const divFlex = document.createElement("div");
    divFlex.classList.add("d-flex", "align-items-center");

    const picContainer = document.createElement("div");
    // picContainer.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.setAttribute("src", arrayPlaylists[index].picture_small);

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("ms-2", "me-auto");

    const title = document.createElement("p");
    title.innerText = arrayPlaylists[index].title;

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
    playBtn.classList.add("playPlaylist", "btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "bottom-0", "end-0", "d-none", "p-2");

    col.addEventListener("mouseover", (e) => {
      playBtn.classList.remove("d-none");
      col.classList.add("shadow-lg", "bg-secondary");
    });
    col.addEventListener("mouseout", (e) => {
      playBtn.classList.add("d-none");
      col.classList.remove("shadow-lg", "bg-secondary");
    });

    titleContainer.appendChild(title);

    picContainer.appendChild(pic);
    // picContainer.appendChild(playBtn);

    divFlex.appendChild(picContainer);
    divFlex.appendChild(titleContainer);
    divFlex.appendChild(playBtn);

    col.appendChild(divFlex);

    playlistRow.appendChild(col);
  }
};

fetchArtist = async (artistArray, options, row) => {
  for (let index = 0; index <= 5; index++) {
    const response = await fetch(artistArray[index], options);
    const currentArtist = await response.json();

    // console.log("currentArtiast", currentArtist);

    const col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-lg-3", "col-xl-2");
    // if (index === 5) {
    //   col.classList.add("d-lg-none");
    // }
    // if (index === 4) {
    //   col.classList.add("d-md-none");
    // }

    if (index === 5) {
      col.classList.add("hide-on-xl");
      // console.log("saaaaaas");
    }
    if (index === 4) {
      col.classList.add("hide-on-lg");
    }
    if (index === 3) {
      col.classList.add("hide-on-md");
    }
    if (index === 2) {
      col.classList.add("hide-on-sm");
    }

    const card = document.createElement("div");
    card.classList.add("border-0", "rounded");
    card.style.cursor = "pointer";
    // card.style.width = "180px";

    const divPic = document.createElement("div");
    divPic.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.classList.add("bd-placeholder-img", "card-img-top", "p-2");
    pic.style.objectFit = "contain";

    pic.setAttribute("src", currentArtist.data[0].artist.picture);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const artist = document.createElement("h5");
    artist.classList.add("card-title", "text-truncate");
    artist.innerText = currentArtist.data[0].artist.name;

    // const title = document.createElement("p");
    // title.classList.add("card-text", "text-truncate");
    // title.innerText = albums[index].title;
    // title.style.cursor = "pointer";

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
    playBtn.classList.add("playArtist", "btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "position-absolute", "bottom-0", "end-0", "d-none", "p-2");

    col.addEventListener("mouseover", (e) => {
      playBtn.classList.remove("d-none");
      card.classList.add("shadow-lg", "bg-secondary");
    });
    col.addEventListener("mouseout", (e) => {
      playBtn.classList.add("d-none");
      card.classList.remove("shadow-lg", "bg-secondary");
    });

    divPic.appendChild(playBtn);

    cardBody.appendChild(artist);
    // cardBody.appendChild(title);

    divPic.appendChild(pic);
    card.appendChild(divPic);
    card.appendChild(cardBody);

    col.appendChild(card);

    row.appendChild(col);
  }
};

fetchArtist2 = async (artistArray, options, row4) => {
  for (let index = 6; index < artistArray.length; index++) {
    const response = await fetch(artistArray[index], options);
    const currentArtist = await response.json();

    // console.log("currentArtiast", currentArtist);

    const col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-lg-3", "col-xl-2");
    // if (index === 5) {
    //   col.classList.add("d-lg-none");
    // }
    // if (index === 4) {
    //   col.classList.add("d-md-none");
    // }

    if (index === 9) {
      col.classList.add("hide-on-xl");
      // console.log("saaaaaas");
    }
    if (index === 8) {
      col.classList.add("hide-on-lg");
    }
    if (index === 7) {
      col.classList.add("hide-on-md");
    }
    if (index === 6) {
      col.classList.add("hide-on-sm");
    }

    const card = document.createElement("div");
    card.classList.add("border-0", "rounded");
    card.style.cursor = "pointer";
    // card.style.width = "180px";

    const divPic = document.createElement("div");
    divPic.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.classList.add("bd-placeholder-img", "card-img-top", "rounded-circle", "p-2");
    pic.style.objectFit = "contain";

    pic.setAttribute("src", currentArtist.data[0].artist.picture);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const artist = document.createElement("h5");
    artist.classList.add("card-title", "text-truncate");
    artist.innerText = currentArtist.data[0].artist.name;

    // const title = document.createElement("p");
    // title.classList.add("card-text", "text-truncate");
    // title.innerText = albums[index].title;
    // title.style.cursor = "pointer";

    const playBtn = document.createElement("button");
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="20px" heigth="20px" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
    playBtn.classList.add("playArtist", "btn", "rounded-circle", "bg-success", "d-flex", "justify-content-center", "align-items-center", "position-absolute", "bottom-0", "end-0", "d-none", "p-2");

    col.addEventListener("mouseover", (e) => {
      playBtn.classList.remove("d-none");
      card.classList.add("shadow-lg", "bg-secondary");
    });
    col.addEventListener("mouseout", (e) => {
      playBtn.classList.add("d-none");
      card.classList.remove("shadow-lg", "bg-secondary");
    });

    divPic.appendChild(playBtn);

    cardBody.appendChild(artist);
    // cardBody.appendChild(title);

    divPic.appendChild(pic);
    card.appendChild(divPic);
    card.appendChild(cardBody);

    col.appendChild(card);

    row4.appendChild(col);
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
    fetchPlaylist(options);
    fetchAlbum(albumUrl, options, row1);
    fetchArtist(artistArray, options, row2);
    fetchArtist2(artistArray, options, row4);
    fetchSong(url2, options, row3);
  } catch (error) {
    console.error(error);
  }
});

// window.addEventListener("scroll", () => {
//   const header = document.getElementById("header");

//   if (window.scrollY > 50) {
//     // header.style.backgroundColor = "#33363A2";
//     header.style.backgroundColor = "#121212"; //#121212
//   } else {
//     // header.style.backgroundColor = "#121212"; //#121212
//   }
// });
