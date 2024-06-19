document.addEventListener("DOMContentLoaded", async () => {
    const playlistId = [490, 65856, 300, 99391391, 402, 99333, 502, 504, 99223, 42364, 4000, 68429];
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/playlist/';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key':  '080c04199dmsh0a412dd991409a2p1ad76fjsn2f37e6874b74',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    const playlistContainer = document.getElementById('playlist-container');

    try {
        for (let id of playlistId) {
            const response = await fetch(`${url}${id}`, options);
            const result = await response.json();

            const col = document.createElement('div');
            col.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = result.picture_medium;
            img.classList.add('card-img-top');
            img.addEventListener('click', function () {
                window.location.href = `playlist.html?id=${result.id}`;
            });

            card.appendChild(img);
            col.appendChild(card);
            playlistContainer.appendChild(col);
        }
    } catch (error) {
        console.error(error);
    }
     
    const clickedPlaylist = new URLSearchParams(window.location.search).get("id");
     
    fetch(url + clickedPlaylist, {
       headers: {
            'x-rapidapi-key':  '080c04199dmsh0a412dd991409a2p1ad76fjsn2f37e6874b74',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }

        
        })
    .then(response => response.json())


// funzione per ricerca
    document.getElementById('input-search').addEventListener('keydown', function (event) {
              if (event.key === 'Enter') { // quando premo enter
                const query = event.target.value; 
                if (query) {
                    console.log(query);
                    searchArtist(query);
                }
            }
        });
    
    // faccio la fetch
      function searchArtist(query) {
            const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
          fetch(url)
              .then(response => response.json())
           .then(data => {
                    console.log(data);
                    showSongs(data); 
           })
          .catch(error => {
                    console.error('Errore nella ricerca', error);
                });
        }

     //funzione per mostrare i risultati della ricerca
        function showSongs(data) {
            const playlistContainer = document.getElementById('playlist-container');
            playlistContainer.innerHTML = '';
            const albums = data.data;

             albums.forEach(album => {
                const img = document.createElement('img');
                img.src = album.album.cover_medium; 
                img.classList.add('img-fluid', 'rounded', 'mx-2', 'my-2');
                
                const col = document.createElement('div');
                col.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
                
                const title = document.createElement('p');
                title.textContent = album.title;
                title.classList.add('text-center', 'text-white');
                
                col.appendChild(img);
                col.appendChild(title);

                playlistContainer.appendChild(col);
            });
        }
    
})



