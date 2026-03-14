let allMovies = [];
let page = 1;

document.getElementById('search').addEventListener('input', debounce(searchMovies, 300));
window.addEventListener('scroll', infiniteScroll);

async function loadMovies() {
    const movies = await fetchMovies('', page);
    allMovies = allMovies.concat(movies);
    renderGrid(allMovies);
    page++;
}

function renderGrid(movies) {
    document.getElementById('grid').innerHTML = movies.map(m => `
        <div class="movie-card" onclick="openMovie(${m.id})">
            <img src="${m.poster}" loading="lazy">
            <h3>${m.title}</h3>
        </div>
    `).join('');
}

async function openMovie(id) {
    const movie = allMovies.find(m => m.id === id);
    document.getElementById('modal').style.display = 'block';
    
    // Load torrents
    const torrents = await getTorrents(movie.title);
    document.getElementById('torrents').innerHTML = 
        torrents.map(t => `<a href="${t.magnet}">📁 ${t.quality} (${t.size}) ${t.seeds} seeds</a>`).join('<br>');
}

// Infinite scroll + search/genre filters
function infiniteScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loadMovies();
    }
}

loadMovies(); // Start
