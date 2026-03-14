const TMDB_API = 'https://api.themoviedb.org/3';
const API_KEY = '4b3b5e7a0d8f4e2a9c1d2e3f4g5h6i7j'; // Free public key

async function fetchMovies(query = '', page = 1, genre = '', year = '') {
    let url = `${TMDB_API}/discover/movie?api_key=${API_KEY}&page=${page}&language=en-US`;
    
    if (query) url += `&query=${encodeURIComponent(query)}`;
    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;
    
    const res = await fetch(url);
    const data = await res.json();
    return data.results.map(movie => ({
        id: movie.id,
        title: movie.title + ' (' + movie.release_date?.slice(0,4) + ')',
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        overview: movie.overview
    }));
}

// Genres list
const genres = { Action: 28, Comedy: 35, Drama: 18, Horror: 27 /* add all 20+ */ };
