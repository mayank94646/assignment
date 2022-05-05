/** Protected route HOC */

import React from 'react';

import MainHeader from '../components/MainHeader/MainHeader.jsx';

import { Navigate, useLocation } from 'react-router-dom';
import { getLocalStorage } from './commonMethods.jsx';

export default function RequireAuth({ children }) {

    let location = useLocation();
    let user = getLocalStorage('netomiUser')

    if (user)
        return <React.Fragment><MainHeader user={JSON.parse(user)} />{React.cloneElement(children, { user: JSON.parse(user) })}</React.Fragment>;
    else
        return <Navigate to="/login" state={{ from: location }} replace />;

}