import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Employer.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import link from '../../backendLink';

const Employer = ({showLoading}) => {
  const [jobData, setJobData] = useState([])
  const navigate=useNavigate()
  const fetchData = async()=> {
    showLoading(true, 'Loading Jobs...')
    try{
      const resp = await axios(`${link}/api/v1/job/`, {
        headers:{
          'Authorization':`Bearer ${Cookies.get('token')}`
        }
      })
      console.log(resp.data)
      if(resp.data.msg!=='No Jobs Found')
      setJobData(resp.data.allJobs.reverse())
    }
    catch(error) {
      console.log(error.response)
    }

    showLoading(false, 'random')
  }
  useEffect(()=> {

    const user=JSON.parse(window.localStorage.getItem('user'))
    if(user.role === 'seeker') {
      navigate('/seeker')
    }

    fetchData()
  }, [])
  return (
    <div className='empMain'>
      <h3>Your Job Postings :</h3>
      
      {
        jobData.length!==0 
        ?
        <section className="jobs">
        {jobData.map(item => {
          return <JobCard job={item} key={item._id}/>
        })}
        </section>
        :
        <p>No Job Found.(You haven't posted any jobs yet)</p>
      }
    </div>
  )
}

const JobCard = ({job}) => {
  const navigate=useNavigate()
  return (
    <Card className="text-center card">
      <Card.Header> {job.type==='tech'?'Tech':'Non-Tech'} Job </Card.Header>
      <Card.Body>
        <Card.Title>{job.jobTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> {job.companyName} </Card.Subtitle>
        <Card.Text>
          <span> Mode of Job : {job.mode==='online'?'Online':'On-site'} </span> <br />
          <span> Package Offered : {job.package}LPA </span> <br />
          <span> {job?.location ? `Location : ${job?.location}` : ''} </span>
          <span> Total Application : {job.totalApplications} </span>
        </Card.Text>
        <Button variant="primary" onClick={()=> navigate(`/job/${job._id}`)}>More Details</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Posted: {Math.floor((new Date().getTime() - new Date(job.date).getTime()) / (1000 * 3600 * 24))} days ago</Card.Footer>
    </Card>
  )
}

export default Employer