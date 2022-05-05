import { Link, useNavigate } from "react-router-dom";

import { removeLocalStorage } from '../../common/commonMethods.jsx';

/** Import CSS */
import './MainHeader.css';

export default function MainHeader({ user }) {

    const navigate = useNavigate();

    const logOutUser = () => {
        removeLocalStorage('netomiUser');
        navigate('/login');
    }

    return (
        <div className='main-header'>
            <div className='main-header-primary-section'>
                <Link to='/movies'>Movies</Link>
            </div>
            <div className='main-header-secondary-section'>Welcome, {user.name}</div>
            <div className='main-header-tertiary-section'>
                <button onClick={logOutUser}> Logout</button>
            </div>
        </div>
    )
}
