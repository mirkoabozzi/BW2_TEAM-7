const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=san_pacho";
const url2 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=hugel";
const url3 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=wade";

const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");

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

    console.log(randomSong);

    songIndex.push(randomSong);
    console.log(songIndex);

    const song = songs[randomSong];

    const col = document.createElement("div");
    col.classList.add("col");

    const card = document.createElement("div");
    card.classList.add("card", "border-0");

    const divPic = document.createElement("div");
    divPic.classList.add("position-relative");

    const pic = document.createElement("img");
    pic.classList.add("bd-placeholder-img", "card-img-top", "p-2");
    pic.style.cursor = "pointer";
    pic.style.objectFit = "contain";

    pic.setAttribute("src", song.album.cover);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const artist = document.createElement("h5");
    artist.classList.add("card-title");
    artist.style.cursor = "pointer";
    artist.innerText = song.artist.name;

    const title = document.createElement("p");
    title.classList.add("card-text");
    title.innerText = song.title;
    title.style.cursor = "pointer";
    // title.style.height = "50px";
    // title.style.whiteSpace = "nowrap";
    // title.style.overflow = "hidden";
    // title.style.textOverflow = "ellipsis";

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
  } catch (error) {
    console.error(error);
  }
});
