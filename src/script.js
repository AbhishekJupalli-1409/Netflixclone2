//api key from TMDB
const api = "api_key=4a0f8eb0308c6a069d518c17f1465a55";

//base url
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const image_url = "https://image.tmdb.org/t/p/w300"; //you can change to w185 to ur preference 185 is the size of image

//requests for movie data
function toggleSearchBox() {
    console.log("Toggle search box called!");
    const searchContainer = document.getElementById("search-container");
    const searchBox = document.getElementById("search-box");

    searchContainer.classList.toggle("search-active");

    if (searchContainer.classList.contains("search-active")) {
        searchBox.focus(); // Focus on the input box when it appears
    } else {
        searchBox.value = ""; // Clear the input box when it disappears
    }
}

const requests = {

    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&language=en-US&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,  //https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`
};

//Used to truncate the string
function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
}

//banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        if (results && results.length > 0) {
            const setMovie = results[Math.floor(Math.random() * results.length)];
            var banner = document.getElementById("banner");
            var banner_title = document.getElementById("banner_title");
            var banner_desc = document.getElementById("banner_description");

            banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
            banner_desc.innerText = truncate(setMovie.overview, 150);
            banner_title.innerText = setMovie.title || setMovie.name;
        } else {
            console.error("No results found.");
        }
    })
    .catch((error) => console.error("Error fetching Netflix Originals:", error));

// movie row
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "NETFLIX ORIGINALS";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            const poster = document.createElement("img");
            poster.className = "row_posterLarge";
            var s = movie.name.replace(/\s+/g, "");
            poster.id = s;
            poster.src = image_url + movie.poster_path;
            row_posters.appendChild(poster);
        });
    })
    .catch((error) => console.error("Error fetching Netflix Originals:", error));




fetch(requests.fetchActionMovies)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "ACTION MOVIES";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            if (movie.poster_path) { // Ensure poster_path is available
                const poster = document.createElement("img");
                poster.className = "row_poster";
                var s2 = (movie.title || movie.name).replace(/\s+/g, ""); // Use movie.title for movies
                poster.id = s2;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            }
        });
    })
    .catch((error) => console.error("Error fetching Action Movies:", error));




// COMEDY MOVIES

fetch(requests.fetchComedyMovies)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "COMEDY MOVIES";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            if (movie.poster_path) { // Ensure poster_path is available
                const poster = document.createElement("img");
                poster.className = "row_poster";
                var s2 = (movie.title || movie.name).replace(/\s+/g, ""); // Use movie.title for movies
                poster.id = s2;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            }
        });
    })
    .catch((error) => console.error("Error fetching Action Movies:", error));
fetch(requests.fetchTrending)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "TRENDING MOVIES";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            if (movie.poster_path) { // Ensure poster_path is available
                const poster = document.createElement("img");
                poster.className = "row_posterLarge";
                var s2 = (movie.title || movie.name).replace(/\s+/g, ""); // Use movie.title for movies
                poster.id = s2;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            }
        });
    })
    .catch((error) => console.error("Error fetching Action Movies:", error));




//HORROR MOVIES

fetch(requests.fetchHorrorMovies)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "HORROR MOVIES";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            if (movie.poster_path) { // Ensure poster_path is available
                const poster = document.createElement("img");
                poster.className = "row_poster";
                var s2 = (movie.title || movie.name).replace(/\s+/g, ""); // Use movie.title for movies
                poster.id = s2;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            }
        });
    })
    .catch((error) => console.error("Error fetching Action Movies:", error));



//


fetch(requests.fetchRomanceMovies)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "ROMANCE MOVIES";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            if (movie.poster_path) { // Ensure poster_path is available
                const poster = document.createElement("img");
                poster.className = "row_poster";
                var s2 = (movie.title || movie.name).replace(/\s+/g, ""); // Use movie.title for movies
                poster.id = s2;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            }
        });
    })
    .catch((error) => console.error("Error fetching Action Movies:", error));




fetch(requests.fetchDocumentaries)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results;
        const headrow = document.getElementById("headrow");

        // Create row div
        const row = document.createElement("div");
        row.className = "row netflixrow";
        headrow.appendChild(row);

        // Create title
        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "DOCUMENTARIES";
        row.appendChild(title);

        // Create container for posters
        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        // Loop through results and create poster images
        results.forEach((movie) => {
            if (movie.poster_path) { // Ensure poster_path is available
                const poster = document.createElement("img");
                poster.className = "row_poster";
                var s2 = (movie.title || movie.name).replace(/\s+/g, ""); // Use movie.title for movies
                poster.id = s2;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            }
        });
    })
    .catch((error) => console.error("Error fetching Action Movies:", error));

