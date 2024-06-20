const params = new URLSearchParams(window.location.search);
const id = params.get("spotifyId");

window.addEventListener("DOMContentLoaded", async () => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b9eade08ffmshc181240ed36d6a3p114651jsn1ec062420e35",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    fetchAlbum(albumUrl, options, row1);
  } catch (error) {
    console.error(error);
  }
});
