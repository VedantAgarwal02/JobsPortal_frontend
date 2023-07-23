import React, { useEffect, useState } from 'react'
import JobDescription from './JobDescription'
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreateApplication = () => {
  const params = useParams()
  const [job, setJob] = useState()
  const [user, setUser] = useState()
  const [isApplied, setIsApplied] = useState(false)
  let jobId;
  const navigate = useNavigate()

  const fetchData = async () => {
    try{
      const resp = await axios.get(`https://jobsportal-backend.onrender.com/api/v1/job/${jobId}`, {
      headers:{
        Authorization : `Bearer ${Cookies.get('token')}`
      }

      
    })
    
    const tempUser = (JSON.parse(window.localStorage.getItem('user'))._id)
    try {
      const application = await axios.get(`https://jobsportal-backend.onrender.com/api/v1/application/${params.jobId}/${tempUser}`, {
      headers : {
        Authorization : `Bearer ${Cookies.get('token')}`
      }
    })

    if(application.data.success) {
      setIsApplied(true)
    }

    }
    catch(error) {
      setIsApplied(false)
      console.log(error)
    }

    
    
    if(resp.data.success){
      setJob(resp.data.job)
    }
    else {
      console.log("some error occurred")
    }
    }
    catch(error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const resume = document.getElementById('resume').value
    if(!resume) {
      alert('Please provide link of your resume')
      return
    }
    
    try {
      const resp = await axios.post(`https://jobsportal-backend.onrender.com/api/v1/application/${params.jobId}`, {resume,qualification:user.qualification, applicantName:user.name,companyName:job.companyName, jobTitle:job.jobTitle}, {
        headers : {
          Authorization : `Bearer ${Cookies.get('token')}`
        }
      })

      console.log(resp)

      if(resp.data.success) {
        let prevApplications = job.totalApplications;
        const updateApplication = await axios.patch(`https://jobsportal-backend.onrender.com/api/v1/job/${params.jobId}`, {totalApplications:prevApplications+1}, {
          headers : {
            Authorization : `Bearer ${Cookies.get('token')}`
          }
        })
        navigate(`/home/${user.role}`)
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    jobId = (params.jobId)
    setUser(JSON.parse(window.localStorage.getItem('user')))
    fetchData()
  }, [])
  return (
    <div>
      <CustomNav />
      
      <JobDescription job={job} />
      <br />
      <br />
      <br />
      <section className="applications">
        <h3>Apply for Job :</h3>
        {isApplied
        ?
        <div style={{width:"70%", margin:'auto'}} >
          <hr />
          <h5>You have already applied for this Job.</h5>
          <p>You can view your application in 'View your Applications' tab.</p>
          <hr />
        </div>
        :
        <section>
          <ol className="instructions">
          <li>Upload your resume in any format on Google Drive or any other cloud storage platform.</li>
          <li>Then, paste the link of your resume in below dialogue box.</li>
          <li>To be considered for Job Opening, please make sure that your links works perfectly.</li>
        </ol>

        <FloatingLabel
          label="Link for your Resume:*"
          className="mb-3"
        >
          <Form.Control id='resume' type="text" placeholder="name@example.com" />
        </FloatingLabel>

        <Button type='submit' onClick={handleSubmit}>Submit your Application</Button>
        </section>
      }
      </section>
    </div>
  )
}

const CustomNav = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState()
  useEffect(()=> {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const logout =() => {
     if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('user')
      Cookies.remove('token')
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
              <NavDropdown.Item onClick={()=> navigate(`/profile/${user._id}`)}>Profile Page</NavDropdown.Item>
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

export default CreateApplication