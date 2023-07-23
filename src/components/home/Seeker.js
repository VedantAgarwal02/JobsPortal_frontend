import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Seeker.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Seeker = () => {
  const [jobData, setJobData] = useState([])

  const fetchData = async()=> {
    try{
      const resp = await axios('https://jobsportal-backend.onrender.com/api/v1/job/', {
        headers:{
          'Authorization':`Bearer ${Cookies.get('token')}`
        }
      })
      if(resp.data.msg!=='No Jobs Found'){
        let allJobs = resp.data.allJobs
        setJobData(allJobs)
      }
    }
    catch(error) {
      console.log(error.response)
    }
  }
  useEffect(()=> {
    fetchData()
  }, [])

  return (
    <div className='seekerMain'>
      <h3>Recent Job Postings :</h3>
      
      {
        jobData.length!==0 
        ?
        <section className="jobs">
        {jobData.map(item => {
          return <JobCard job={item} key={item._id}/>
        })}
        </section>
        :
        <p>No Job Found.(Sorry there is currently no active job openings)</p>
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
          <span> {job?.location ? `Location : ${job?.location}` : ''} {job?.location ? <br /> : ''} </span>
          <span> Package Offered : {job.package} </span> <br />
        </Card.Text>
        <Button variant="primary" onClick={()=> navigate(`/${job._id}/apply`)}>Apply </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Posted: {Math.floor((new Date().getTime() - new Date(job.date).getTime()) / (1000 * 3600 * 24))} days ago</Card.Footer>
    </Card>
  )
}

export default Seeker