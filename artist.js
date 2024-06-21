document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('name');
    const artistImg = urlParams.get('img');

    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`;
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)

        const artistNameElement = document.getElementById('artist-name');
        const artistImageElement = document.querySelector('.container-image');
        artistNameElement.classList.add("fw-bold");

        if (result.data && result.data.length > 0) {
            
            artistNameElement.textContent = result.data[0].artist.name;
            if (artistImageElement) {
                artistImageElement.style.backgroundImage = `url(${result.data[0].artist.picture_xl})`;
            }

            const songsContainer = document.getElementById("songs-album");
            const table = document.createElement("table");
            table.classList.add("table", "mt-4", "bg-black", "table-hover");

            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");
            headerRow.classList.add("border-bottom", "pb-3");

            const th1 = document.createElement("th");
            th1.textContent = "#";
            headerRow.appendChild(th1);

            const th2 = document.createElement("th");
            th2.textContent = "";
            headerRow.appendChild(th2);

            const th3 = document.createElement("th");
            th3.textContent = "Titolo";
            headerRow.appendChild(th3);

            const th4 = document.createElement("th");
            th4.textContent = "Album";
            headerRow.appendChild(th4);

            const th5 = document.createElement("th");
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

            th5.appendChild(svgIcon);
            headerRow.appendChild(th5);

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");

            result.data.forEach((song, index) => {
    const row = document.createElement("tr");
    row.classList.add("row-bg");

    // Prima colonna (numero)
    const td1 = document.createElement("td");
    td1.textContent = index + 1;
    row.appendChild(td1);

    // IMMagine album
    const tdImmagine = document.createElement("td");
    const albumImage = document.createElement("img");
    albumImage.src = song.album.cover; 
    albumImage.alt = song.album.title; 
    albumImage.setAttribute("width", "30px");
    albumImage.setAttribute("height", "30px");
    tdImmagine.appendChild(albumImage);
    row.appendChild(tdImmagine);

    // Seconda colonna (titolo)
    const td2 = document.createElement("td");
    td2.textContent = song.title;
    row.appendChild(td2);

    // Terza colonna (album)
    const td3 = document.createElement("td");
    td3.textContent = song.album.title;
    row.appendChild(td3);

    // Quarta colonna (durata)
    const td4 = document.createElement("td");
    td4.textContent = convertStoMs(song.duration);
    row.appendChild(td4);

    tbody.appendChild(row);
});

            table.appendChild(tbody);


            songsContainer.appendChild(table);

        } else {
            console.error('Artista non trovato');
        }

    } catch (error) {
        console.error('Errore nella fetch dei dati dell\'artista', error);
    }
});


function convertStoMs(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + remainingSeconds;
}
