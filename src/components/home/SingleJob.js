import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './SingleJob.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import JobDescription from './JobDescription';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import Cookies from 'js-cookie';

const SingleJob = () => {
  const params = useParams()
  const [job, setJob] = useState()
  const [applications, setApplications] = useState()
  const [user, setUser] = useState()
  let jobId;
  const fetchData = async()=> {
    try {
      const resp = await axios(`https://jobsportal-backend.onrender.com/api/v1/job/${jobId}`, {
        headers : {
          Authorization : `Bearer ${Cookies.get('token')}`
        }
      })

      if(resp.data.success)
      setJob(resp.data.job)
      else {
        console.log("some error occurred")
      }

      const resp1 = await axios(`https://jobsportal-backend.onrender.com/api/v1/application/${jobId}`, {
        headers : {
          Authorization : `Bearer ${Cookies.get('token')}`
        }
      })
      console.log(resp1.data.applications)
      setApplications(resp1.data.applications)
    }
    catch(error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    jobId = params.jobId;
    setUser(JSON.parse(window.localStorage.getItem('user')))
    fetchData()
  },[])
  return (
    <div>
      <CustomNav />
      
      <JobDescription job={job} />

      <br />
      <br />
      <br />
      {
        user?.role ==='employer'
        ?
        <section className="applications">
          <h3>Applications for your Job :</h3>
          {
            applications?.length===0 
            ?
            <div style={{width:"70%", margin:'auto'}} >
              <hr />
              <h5> There are no applications for you job posting yet. </h5>
              <p> You'll be able to see applications' list, once someone applies for it. </p>
              <hr />
            </div>
            :
            
            <table className='applicationsTable' >
              <thead>
                <tr>
                  <th> <h5>Applicant Name</h5> </th>
                  <th> <h5>Qualification</h5> </th>
                  <th>  <h5>Status</h5> </th>
                  <th> <h5>Link to Resume</h5> </th>
                </tr>
              </thead>
              <tbody>
                {applications?.map(application => {
                  return <ApplicationCard key={application._id} application={application} />
                })}
              </tbody>
            </table>
            
          }
        </section>
        :
        <div />
      }
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
  // console.log(application)
  return (
    <tr>
      <td>  {application.applicantName}  </td>
      <td>  {application.qualification}  </td>
      <td>  {application.status}  </td>
      <td>  <a href={application.resume}>Link</a>  </td>
      <td>  <Button size='sm' variant='outline-primary' id='editBtn' >Edit Status</Button>  </td>
    </tr>
  )
}

export default SingleJob