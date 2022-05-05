/** Import CSS */
import './Movie.css';

export default function Movie(props) {

    const navigateto = () => {
        window.open(`${window.location.href}/${props.id}`, '_blank')
    }

    return (
        <div id={props.id} className='movie' onClick={navigateto}>
            {props.poster !== 'N/A' ?
                <img src={props.poster} alt='Not Available' className='movie-poster' /> :
                <div className="movie-poster-unavailable">Image unavailable</div>
            }
            <div className='movie-overview'>
                <div className='movie-overview-title'>{props.title}</div>
                <div className='movie-desc'>
                    <p>{props.type}</p>
                    <p>{props.year}</p>
                </div>
            </div>
        </div>
    )
}