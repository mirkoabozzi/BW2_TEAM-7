document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('name');
    const artistImg = urlParams.get('img');

    // const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/`;
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-key': '080c04199dmsh0a412dd991409a2p1ad76fjsn2f37e6874b74',
    //         'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    //     }
    // };


        const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`;
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)

        const artistName = document.getElementById('artist-name');
        const artistImage = document.querySelector('.container-image');
        artistName.classList.add("fw-bold")
        if (result.data && result.data.length > 0) {
              artistName.textContent = result.data[0].artist.name;
            if (artistImage) {
                artistImage.style.backgroundImage = `url(${result.data[0].artist.picture_xl})`;
            }
            
                 
            const songs = document.getElementById('table-content');
            result.data.forEach((element,index) => {
                const tr = document.createElement("tr");
                const tdNumber = document.createElement("td");
                tdNumber.innerText = index + 1;
                tr.appendChild(tdNumber);

                songs.appendChild(tr)
            });   

        } else {
            console.error('elemento non trovato');
        }

    
    
        
    //     const listners = document.getElementById("ascoltatori");
    //     listners.textContent = result.nb_fan + " ascoltatori mensili";


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

