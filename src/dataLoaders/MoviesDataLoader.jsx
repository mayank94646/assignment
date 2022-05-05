export const fetchMovies = (params = {}) => {

    let url = new URL('http://www.omdbapi.com/')
    url.search = new URLSearchParams(params)

    return fetch(url)
        .then((response) => response.json());
}