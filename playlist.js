document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistId = urlParams.get('id');
    const playlistImg = urlParams.get('img');

    const url = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '080c04199dmsh0a412dd991409a2p1ad76fjsn2f37e6874b74',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();




        const playlistCover = document.getElementById("img-playlist");
        if (playlistCover)
            playlistCover.src = playlistImg;

        
        playlistCover.classList.add('img-fluid', 'rounded'); 
        playlistCover.addEventListener('click', function () {
            window.location.href = `artist.html?id=${artistId}`;
        })

    // Personalizza ulteriormente le dimensioni e altri stili se necessario
    playlistCover.style.maxWidth = '13rem'; // Imposta larghezza massima
        playlistCover.style.borderRadius = '10px';
        
        

        const playlistName = document.getElementById('playlist-name');
        playlistName.textContent = result.title;

        const userName = document.getElementById('user-name');
        userName.classList.add("fw-bold")
        userName.textContent = result.creator.name + " " + "·";

        const songsNumber = document.getElementById('songs-number');
        songsNumber.textContent = `${result.nb_tracks} brani,`;

        const durationPlaylist = document.getElementById('duration-playlist');
        const durationMinutes = Math.round(result.duration / 60); // calcola la durata approssimativa in minuti
        durationPlaylist.textContent = `circa ${durationMinutes} min`;

        // tabella per canzoni nella playlist
       const songsContainer = document.getElementById("songs");
const table = document.createElement("table");
table.classList.add("table", "mt-4", "bg-black", "table-hover");

const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
headerRow.classList.add("border-bottom", "pb-3");

// Prima colonna (numero)
const th1 = document.createElement("th");
th1.textContent = "#";
headerRow.appendChild(th1);

// Seconda colonna (titolo)
const th2 = document.createElement("th");
th2.textContent = "Titolo";
headerRow.appendChild(th2);

// Terza colonna (album)
const th3 = document.createElement("th");
th3.textContent = "Album";
headerRow.appendChild(th3);

// Quarta colonna (durata) con icona SVG
const th4 = document.createElement("th");
const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgIcon.classList.add("ms-2");
svgIcon.setAttribute("viewBox", "0 0 16 16");
svgIcon.setAttribute("height", "20px");
svgIcon.setAttribute("width", "20px");
const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path1.setAttribute("d", "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z");
svgIcon.appendChild(path1);

const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path2.setAttribute("d", "M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z");
svgIcon.appendChild(path2);

th4.appendChild(svgIcon);
headerRow.appendChild(th4);

thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = document.createElement("tbody");

    result.tracks.data.forEach((element, index) => {
    const row = document.createElement("tr");
    row.classList.add("row-bg");

    // Prima colonna (numero)
    const td1 = document.createElement("td");
    td1.textContent = index + 1;
    row.appendChild(td1);

    // Seconda colonna (titolo)
    const td2 = document.createElement("td");
    td2.textContent = element.title;
    row.appendChild(td2);

    // Terza colonna (album)
    const td3 = document.createElement("td");
    td3.textContent = element.album.title;
    row.appendChild(td3);

    // Quarta colonna (durata)
    const td4 = document.createElement("td");
    td4.textContent = convertStoMs(element.duration);
    row.appendChild(td4);



    tbody.appendChild(row);
});


table.appendChild(tbody);

songsContainer.appendChild(table);

        console.log("playlist", result);

    } catch (error) {
        console.error('Errore', error);
    }
});

  
    //  const data = [
    //     {
    //         album: { id: 86950, title: 'Jehro', cover_medium: 'https://e-cdns-images.dzcdn.net/images/cover/068c6…10491db5ecafa8d392361da/250x250-000000-80-0-0.jpg' },
    //         artist: { id: 4792, name: 'Jehro', link: 'https://www.deezer.com/artist/4792' },
    //         duration: 214,
    //         id: 730397,
    //         link: 'https://www.deezer.com/track/730397',
    //         title: 'Mama'
    //     }
        // Aggiungi altre canzoni se necessario
    // ];

   
    //   const playlistContainer = document.querySelector('.row');
    // data.forEach((song) => {
    //     // Crea il div per la colonna della canzone
    //     const songDiv = document.createElement('div');
    //     songDiv.classList.add('col-lg-3');

    //     // Numero della canzone (aggiungi un id unico se necessario)
    //     const numeroCanzone = document.createElement('span');
    //     numeroCanzone.textContent = 'Numero canzone'; // Modifica con il numero della canzone
    //     songDiv.appendChild(numeroCanzone);

    //     // Titolo della canzone
    //     const titoloCanzone = document.createElement('span');
    //     titoloCanzone.classList.add('ms-4');
    //     titoloCanzone.textContent = song.title;
    //     songDiv.appendChild(titoloCanzone);

    //     // Album della canzone
    //     const albumCanzone = document.createElement('div');
    //     albumCanzone.textContent = song.album.title;
    //     songDiv.appendChild(albumCanzone);

    //     // Data della canzone (se disponibile)
    //     const dataCanzone = document.createElement('div');
    //     dataCanzone.textContent = song.date || 'Data non disponibile';
    //     songDiv.appendChild(dataCanzone);

    //     // Durata della canzone
    //     const durataCanzone = document.createElement('div');
    //     durataCanzone.textContent = `Durata: ${Math.floor(song.duration / 60)} min`;
    //     songDiv.appendChild(durataCanzone);

    //     // Aggiungi la colonna della canzone al contenitore della playlist
    //     playlistContainer.appendChild(songDiv);
    // });const albumId = `${albumId}`;




  function convertStoMs(seconds) {
         let minutes = Math.floor(seconds / 60);
         let extraSeconds = seconds % 60;
         minutes = minutes < 10 ? "0" + minutes : minutes;
         extraSeconds = extraSeconds< 10 ? "0" + extraSeconds : extraSeconds;
         return  minutes + ":" + extraSeconds;
      }