const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=avicii";

window.addEventListener("DOMContentLoaded", async () => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b9eade08ffmshc181240ed36d6a3p114651jsn1ec062420e35",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    songs = result.data;
    let songIndex = [];

    for (let index = 0; index <= 5; index++) {
       let randomSong = Math.floor(Math.random() * songs.length) + 1;
      //let randomSong = 1;

      const verifyIndex = () => {
        let check;
        songIndex.forEach((element) => {
          if (element === randomSong) {
            randomSong=Math.floor(Math.random() * songs.length) + 1;
            check++;
          }
        });
        return check;
      };
      
      do {
        verifyIndex();
      } while (verifyIndex()===0);

      console.log(randomSong);
  
      songIndex.push(randomSong);
      console.log(songIndex);

      const song = songs[randomSong];

      const row = document.getElementById("row");

      const col = document.createElement("div");
      col.classList.add("col");

      const card = document.createElement("div");
      card.className = "card shadow";

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
      title.style.cursor = "pointer";
      title.innerText = song.title;

      cardBody.appendChild(artist);
      cardBody.appendChild(title);

      card.appendChild(pic);
      card.appendChild(cardBody);

      col.appendChild(card);

      row.appendChild(col);
    }
    songIndex=[];
  } catch (error) {
    console.error(error);
  }
});
