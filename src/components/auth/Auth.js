import React, { useEffect, useState } from 'react'
import DashboardNav from '../dashboard/DashboardNav'
import { Button, ButtonGroup } from 'react-bootstrap'
import Login from './Login'
import Signup from './Signup'
import './Auth.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Auth = ({showLoading, showAlert}) => {
  const navigate = useNavigate()
  const [login, setLogin] = useState(true)

  useEffect(()=> {
    if(Cookies.get('token')) {
      const role = JSON.parse(window.localStorage.getItem('user')).role
      navigate(`/${role}`)
    }
  })
  return (
    <div>
      <DashboardNav />
      <section className='auth'>
        <ButtonGroup size='lg' className='btnGroup' >
          <Button variant={`${login ? 'primary' : 'outline-primary'}`} onClick={()=>setLogin(true)} id='loginBtn' className='authBtn'> Login </Button>
          <Button variant={`${login ? 'outline-primary' : 'primary'}`} onClick={()=>setLogin(false)} id='signupBtn' className='authBtn' > Signup </Button>
        </ButtonGroup>

        <article id='form'>
          {
          login ? 
          <Login showLoading={showLoading} showAlert={showAlert} /> : 
          <Signup showLoading={showLoading} showAlert={showAlert} />
          }
        </article>
      </section>
    </div>
  )
}

export default Auth