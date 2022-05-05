

import Movie from './Movie.jsx'

export default function Movies(props) {

    return (
        <div className='movies-container' >
            {
                props.movies.map((movieInfo) => {
                    return (<Movie
                        key={movieInfo.imdbID}
                        id={movieInfo.imdbID}
                        poster={movieInfo.Poster}
                        title={movieInfo.Title}
                        type={movieInfo.Type}
                        year={movieInfo.Year}
                    />)
                })
            }
        </div>
    )
}