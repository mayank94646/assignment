
import { useState, useEffect, useCallback } from 'react';

import QuickSearch from './QuickSearch/QuickSearch.jsx';
import Movies from './Movies/Movies.jsx';
import { fetchMovies } from '../../dataLoaders/MoviesDataLoader.jsx'
import { getLocalStorage, setLocalStorage } from '../../common/commonMethods.jsx';

/** Import CSS */
import './HomePage.css';

const loggedinuserKey = '4aa9f453';

export default function HomePage({ user }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies({
            apikey: loggedinuserKey,
            s: 'lord'
        })
            .then((fetchedMovies) => {
                setMovies(fetchedMovies.Search);
            })
            .catch(() => {
                console.error("Something went wrong");
            })
    }, []);

    const fetchMoviesByName = useCallback((searchedInput) => {

        saveNewSearch(searchedInput);

        fetchMovies({
            apikey: loggedinuserKey,
            s: searchedInput
        })
            .then((fetchedMovies) => {

                if (fetchedMovies.Search) {
                    setMovies(fetchedMovies.Search);
                } else {
                    setMovies([]);
                }
            })
            .catch(() => {
                console.error("Something went wrong");
            })
    }, []);

    const saveNewSearch = (searchedInput) => {
        let searchedItems = getLocalStorage(user.id);
        let newSearchedItems = [];

        if (searchedItems) {
            newSearchedItems = JSON.parse(searchedItems);
        }

        if (!newSearchedItems.includes(searchedInput)) {
            newSearchedItems.unshift(searchedInput);

            if (newSearchedItems.length > 5) {
                newSearchedItems.pop();
            }

            setLocalStorage(user.id, JSON.stringify(newSearchedItems));
        }
    }

    return (
        <div className='home-page'>
            <QuickSearch user={user} fetchMoviesByName={fetchMoviesByName} />
            {movies.length ?
                <Movies movies={movies} /> :
                <div className='home-page-failure-message'>No Movies Found</div>
            }
        </div >
    )
}