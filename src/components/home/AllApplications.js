import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './AllApplications.css'

const AllApplications = () => {
  const [user, setUser] = useState()
  const [applications, setApplications] = useState([])
  const fetchData =  async ()=> {
    try {
      const resp = await axios.get(`https://jobsportal-backend.onrender.com/api/v1/application/`, {
        headers : {
          Authorization : `Bearer ${Cookies.get('token')}`
        }
      })
      console.log(resp.data)
      setApplications(resp.data.applications)
    }
    catch(error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    setUser(JSON.parse(window.localStorage.getItem('user')))
    fetchData()
  }, [])
  return (
    <div >
      <CustomNav />

      <section className="allApplications">
      <h3>Your Job Applications : </h3> 

        {applications.length!==0?

        <table>
          <thead>
            <tr>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Link to Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => {
              return <ApplicationCard key={application._id} application={application} />
            })}
          </tbody>
        </table>

        : 
        <article>
          <hr />
          <h5>No applications yet.</h5>
          <p>Apply to some jobs to view their record here.</p>
          <hr />
        </article>
        }
      </section>

    </div>
  )
}

const CustomNav = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const logout =() => {
    if(window.confirm('Are you sure you want to logout?')){
    Cookies.remove('token')
    window.localStorage.removeItem('user')
    navigate('/')
   }
 }
  const userStyle = {
    textDecoration:'underline',
    cursor:'pointer'
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>navigate(`/home/${user.role}`)} style={{cursor:"pointer"}}>JobsPortal</Navbar.Brand>
          <Nav className="me-auto">
          <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=> navigate(`/profile/${user.id}`)}>Profile Page</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>logout()} >Logout</NavDropdown.Item>
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

const ApplicationCard = ({application})=> {
  const navigate = useNavigate()
  return (
    <tr onClick={()=>navigate(`/job/${application.jobId}`)}>
      <td>{application.companyName}</td>
      <td>{application.jobTitle}</td>
      <td>{application.status}</td>
      <td> <a href={application.resume}>Link</a> </td>
    </tr>
  )
}

export default AllApplications