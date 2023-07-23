import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './CreateJob.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateJob = () => {

  const [user, setUser] = useState()
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const navigate=useNavigate()
  const handleSubmit =async(e)=> {
    const jobTitle = document.getElementById('jobTitle').value
    const mode = document.getElementById('mode').value
    const type = document.getElementById('type').value
    const pckg = document.getElementById('package').value

    let flag=true
    if(mode==='Open this select menu' || type==='Open this select menu' || !jobTitle || !pckg){
      alert("Please fill all the details")
      flag=false
      return
    }
    
    const employer=JSON.parse(window.localStorage.getItem('user'))
    const resp = await axios.post('https://jobsportal-backend.onrender.com/api/v1/job/', {jobTitle, mode, type, package:pckg, employerId:user?._id, companyName:user?.companyName}, {
      headers :{
        'Authorization':`Bearer ${Cookies.get('token')}`
      }
    })
    
    console.log(resp)
    if(flag)
    navigate(`/home/${user.role}`)
  }
  return (
    <div>
      <CustomNav />
      <section className="createJob">
      <h3>Create Job :</h3>
      <p>(Details of your company will be attached along with Job Description.)</p>
      <form action="">
        <FloatingLabel
          label="Job Title*"
          className="mb-3"
        >
          <Form.Control id='jobTitle' type="text" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel label="Mode of Job*" className='mb-3'>
          <Form.Select id="mode" aria-label="Floating label">
            <option>Open this select menu</option>
            <option value="online">Online</option>
            <option value="on-site">On-site</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Type of Job*" className='mb-3'>
          <Form.Select id='type' aria-label="Floating label">
            <option>Open this select menu</option>
            <option value="tech">Tech</option>
            <option value="non-tech">Non-Tech</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          label="Package Offered (in LPA)*"
          className="mb-3"
        >
          <Form.Control id='package' type="number" placeholder="name@example.com" />
        </FloatingLabel>

        <Button onClick={()=>handleSubmit()}>Submit</Button>
      </form>
      </section>
    </div>
  )
}

const CustomNav = () => {
  const navigate = useNavigate()
  const userStyle = {
    textDecoration:'underline',
    cursor:'pointer'
  }

  const [user, setUser] = useState()
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const logout =() => {
    if(window.confirm('Are you sure you want to logout?')){
    // setUser([])
    Cookies.remove('token')
    window.localStorage.removeItem('user')
    navigate('/')
   }
 }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>navigate(`/home/${user.role}`)} style={{cursor:"pointer"}}>JobsPortal</Navbar.Brand>
          <Nav className="me-auto">
          <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=> navigate(`/profile/${user._id}`)}>Profile Page</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> logout()} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <span style={userStyle}> {user?.name} </span>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default CreateJob