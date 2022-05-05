import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovies } from '../../../dataLoaders/MoviesDataLoader.jsx'

/** Import CSS */
import './MovieDetails.css';
const loggedinuserKey = '4aa9f453';

export default function MovieDetails() {

    const [movie, setMovie] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetchMovies({
            apikey: loggedinuserKey,
            i: id
        })
            .then((fetchedMovie) => {
                setMovie(fetchedMovie);
            })
            .catch(() => {
                console.error("Something went wrong");
            })
    }, []);

    return (
        <div className='movie-details'>
            {movie ?
                <React.Fragment>
                    <div className="movie-details-poster-wrapper">
                        <img className="movie-details-poster" src={movie.Poster} />
                    </div>
                    <div className="movie-details-desc">
                        <h1 className="movie-details-title">
                            {movie.Title}
                        </h1>
                        <p>Cast: {movie.Actors}</p>
                        <p>Director: {movie.Director}</p>
                        <p>Year: {movie.Released}</p>
                        <p>Rating: {movie.imdbRating}</p>
                        <p>Language: {movie.Language}</p>
                        <h3 className="movie-details-plot">Plot: {movie.Plot}</h3>
                    </div>

                </React.Fragment> :
                <div>Loading...</div>}
        </div>
    )
}