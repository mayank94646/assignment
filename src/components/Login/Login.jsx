
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { fetchUsers } from '../../dataLoaders/UserDataLoader.jsx';
import { setLocalStorage } from '../../common/commonMethods.jsx';

/** Import CSS */
import './Login.css';

export default function Login() {

    const [username, setUsername] = useState('');

    const [showValidation, setShowValidation] = useState(false);

    const navigate = useNavigate();

    /** Method to validate user */
    const validateUser = (event) => {
        event.preventDefault();

        fetchUsers()
            .then((users) => {
                let userFound = users.find((user) => {

                    if (user.username) {
                        return user.username === username;
                    }

                    return false;
                })

                if (userFound) {
                    /** Store user info in local storage */
                    setLocalStorage('netomiUser', JSON.stringify(userFound));

                    /** Navigate user to movies page */
                    navigate('/movies');
                } else {
                    /** Show validation */
                    setShowValidation(true);
                }

            })
            .catch(() => {
                console.error("Something went wrong");
            })

    }

    return (
        <div className='login'>
            <div className='login-left-panel'><p>^netomi Movies</p></div>
            <div className='login-right-panel'>
                <div className='login-form'>
                    <h1>Login</h1>
                    <form onSubmit={validateUser}>
                        <input type="text" placeholder='Username' value={username} onInput={(event) => setUsername(event.target.value)} onFocus={() => setShowValidation(false)} required />
                        <div className={`login-form-validation-message ${showValidation ? '' : 'd-none'}`}>Invalid Username</div>
                        <button type="submit" >Sign-in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
