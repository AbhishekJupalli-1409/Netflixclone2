//api key from TMDB
const api = "api_key=a86be21d3353dab87e086b1c67afd4e9";

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
const NetflixOriginalsBanner = async () =>{
try {
    const res = await axios.get(requests.fetchNetflixOriginals);
    console.log(res);
        const results1 = res.data.results;
    console.log(results1);
        if (results1 && results1.length > 0) {
            const setMovie = results1[Math.floor(Math.random() * results1.length)];
            var banner = document.getElementById("banner");
            var banner_title = document.getElementById("banner_title");
            var banner_desc = document.getElementById("banner_description");

            banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
            banner_desc.innerText = truncate(setMovie.overview, 350);
            banner_title.innerText = setMovie.title || setMovie.name;
        } else {
            console.error("No results found.");
        }
    }
    catch (e) { console.error("Error fetching Netflix Originals:", e) };
}
NetflixOriginalsBanner();


// movie row


const NetflixOriginals = async () => {
    try {
        const res = await axios.get(requests.fetchNetflixOriginals);
        console.log(res);
        const results = res.data.results;
   
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
    }
    catch (error) { console.error("Error fetching Netflix Originals:", error) };
    ActionMovies();
}
NetflixOriginals();


//Action Movies

const ActionMovies = async () => {
    try {
        const res = await axios.get(requests.fetchActionMovies);
        const results = res.data.results;
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
                const assumeleft = poster.getBoundingClientRect();
                console.log(assumeleft.left);
                console.log(s2);
                row_posters.appendChild(poster);


                const posterdisplay = document.createElement("span");
                posterdisplay.className = "poster_display";
                
                
               row_posters.appendChild(posterdisplay);
                const posterdisplayText = document.createElement("span");
                posterdisplayText.innerText = s2;
                posterdisplay.appendChild(posterdisplayText)
                
            }
        });
    }
    catch (error) { console.error("Error fetching Action Movies:", error) };
    ComedyMovies();
}





// COMEDY MOVIES

const ComedyMovies = async () => {
    try {
        const res = await axios.get(requests.fetchComedyMovies);
        const results = res.data.results;
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
    }
    catch { (error) => console.error("Error fetching Action Movies:", error) };
    TrendingMovies();
}






//Trending Movies



const TrendingMovies = async () => {
    try {
        const res = await axios.get(requests.fetchTrending);
        const results = res.data.results;
     
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
    }
    catch (error) { console.error("Error fetching Action Movies:", error) };
    HorrorMovies();
}






//HORROR MOVIES

const HorrorMovies = async () => {
    try {
        const res = await axios.get(requests.fetchHorrorMovies);
        const results = res.data.results;
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
    }
    catch (error) { console.error("Error fetching Action Movies:", error) };
    
RomanceMovies(); 
}




//Romance Movies

    
const RomanceMovies = async () => {
    try {
        const res = await axios.get(requests.fetchRomanceMovies);
        const results = res.data.results;
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
    }
    catch (error) { console.error("Error fetching Action Movies:", error) };
    Documentaries();
}



//Fecting Documentaries

fetch(requests.fetchDocumentaries)
   
const Documentaries = async () => {
    try {
        const res = await axios.get(requests.fetchDocumentaries);
        const results = res.data.results;
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
    }
    catch (error) { console.error("Error fetching Action Movies:", error) };
}


