export const fetchMovies = (params = {}) => {

    let url = new URL(process.env.REACT_APP_MOVIE_URL)
    url.search = new URLSearchParams(params)

    return fetch(url)
        .then((response) => response.json());
}