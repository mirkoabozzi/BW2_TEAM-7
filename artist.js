document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    const artistImg = urlParams.get('img');

    const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/`;
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
        console.log(result)

        const artistName = document.getElementById('artist-name');
        artistName.classList.add("fw-bold")
        artistName.textContent = result.name;

       const artistImage = document.querySelector('.container-image');

        if (artistImage) {
            artistImage.style.backgroundImage = `url(${result.picture_xl})`;
        } else {
            console.error('elemento non trovato');
        }

        const tracklist = document.getElementById('tracklist');
        tracklist.textContent = result.tracklist;
       

         
        
        const listners = document.getElementById("ascoltatori");
        listners.textContent = result.nb_fan + " ascoltatori mensili";


        //  const artistName = data.album.artist.name;
        //     const artistImgUrl = artistImg || data.picture_medium; 
        //     const artistContainer = document.querySelector('#artist-img');
        //     const artistImgElement = document.createElement('img');
        //     artistImgElement.src = artistImgUrl;
        //     artistImgElement.alt = artistName;
        //     artistImgElement.classList.add('img-fluid', 'rounded');
        //     artistContainer.appendChild(artistImgElement);

    } catch (error) {
        console.error('Errore', error);
    }

  

    
    });

