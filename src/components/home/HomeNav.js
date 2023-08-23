import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import ShowAlert from '../Alert';

const HomeNav = () => {
  const navigate = useNavigate()
  const userStyle = {
    textDecoration:'underline',
    cursor:'pointer'
  }

  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  useEffect(()=>{
    const user = JSON.parse(window.localStorage.getItem('user'))
    setUserId(user._id)
    setUserRole(user.role)
    setUserName(user.name)
  }, [])

  const handleClick = () => {
    if(userRole === 'employer') {
      navigate('/job/create')
    }
    else {
      navigate(`/${userId}/applications`)
    }
  }
  const logout =() => {
    if(window.confirm('Are you sure you want to logout?')){
    window.localStorage.removeItem('user')
    Cookies.remove('token')
    navigate('/dashboard')
   }
 }
 
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>navigate(`/${userRole}`)} style={{cursor:"pointer"}}>JobsPortal</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={()=>handleClick()}>
            {userRole==='employer'?'Post Job Opening':'View your applications'}
          </Nav.Link>
          <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=> navigate(`/profile/${userRole}/${userId}`)}>Profile Page</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>logout()} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <span style={userStyle}> {userName} </span>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default HomeNav