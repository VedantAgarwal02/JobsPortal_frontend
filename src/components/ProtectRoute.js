import Cookies from 'js-cookie';
import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectRoute({children}) {
  
    if(!Cookies.get('token')) {
        window.localStorage.removeItem('user')
        return <Navigate to={'/dashboard'} />
    }

    return children;
}

export default ProtectRoute
