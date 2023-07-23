import Cookies from 'js-cookie';
import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectRoute({children}) {
  
    if(!Cookies.get('token')) {
        return <Navigate to={'/'} />
    }

    return children;
}

export default ProtectRoute
