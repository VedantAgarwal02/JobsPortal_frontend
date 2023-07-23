import React from 'react'
import HomeNav from './HomeNav'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <div>
        <HomeNav />
        <Outlet />
    </div>
  )
}

export default SharedLayout