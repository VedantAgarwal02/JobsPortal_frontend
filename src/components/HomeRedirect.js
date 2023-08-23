import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'

const HomeRedirect = () => {
    return <Navigate to='/auth' />
}

export default HomeRedirect