import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './SingleJob.css'
import Button from 'react-bootstrap/Button';
import JobDescription from './JobDescription';
import axios from 'axios';
import Cookies from 'js-cookie';
import {normalizeText} from '../../textConverter'
import link from '../../backendLink'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const SingleJob = ({showLoading, showAlert}) => {
  const params = useParams()
  const [job, setJob] = useState({jobTitle:'...', companyName:'...', package:'-', totalApplications:'-'})
  const [applications, setApplications] = useState([{_id:'1', applicantName:'--', status:'--', qualification:'--', resume:'--'}])
  const [user, setUser] = useState()
  let jobId;
  const fetchData = async()=> {
    showLoading(true, 'Loading Job Details...')
    try {
      const resp = await axios(`${link}/api/v1/job/${jobId}`, {
        headers : {
          Authorization : `Bearer ${Cookies.get('token')}`
        }
      })

      if(resp.data.success)
      setJob(resp.data.job)
      else {
        console.log("some error occurred")
      }

      showLoading(false, 'random')
      showLoading(true, 'Loading Application Details...')

      const resp1 = await axios(`${link}/api/v1/application/${jobId}`, {
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

    showLoading(false, 'random')
  }
  useEffect(()=> {
    jobId = params.jobId;
    setUser(JSON.parse(window.localStorage.getItem('user')))
    fetchData()
  },[])
  return (
    <div>
      
      <JobDescription job={job} user={user} showAlert={showAlert} showLoading={showLoading} />

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
              <h5> There are no applications for your job posting yet. </h5>
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
                  return <ApplicationCard key={application?._id} application={application} showAlert={showAlert} showLoading={showLoading} />
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

const ApplicationCard = ({application, showLoading, showAlert})=> {
  const [editStatus, setEditStatus] = useState(false)
  const [status, setStatus] = useState(application?.status)

  const handleSave =  async () => {
    showLoading(true, 'Updating Status of Application')
    try {
      const resp = await axios.patch(`${link}/api/v1/application/${application.jobId}/${application._id}`, {status}, {
        headers:{
          Authorization:`Bearer ${Cookies.get('token')}`
        }
      })

      if(resp.data.success) {
        showAlert('success', 'Application Updated')
        application.status = status
      }
    }
    catch(error) {
      showAlert('danger', 'Error Occured')
    }
    setEditStatus(false)
    showLoading(false)
  }

  return (
    <tr>
      <td>  {application.applicantName}  </td>
      <td>  {normalizeText(application.qualification)}  </td>
      {
        editStatus ?
        <td >
        <FloatingLabel label="Status Of Application" className='mb-3' >
            <Form.Select id="status" aria-label="Floating label" value={status} onChange={e => setStatus(e.target.value)} >
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </Form.Select>
          </FloatingLabel>
      </td>:
      <td>  {normalizeText(application.status)}  </td>
      
      }
      <td>  <a href={application.resume}>Link</a>  </td>

      {
        editStatus ?
        <td>  <Button size='sm' variant='outline-success' id='editBtn' onClick={handleSave} >Save Status</Button>  </td>:
        <td>
          <Button size='sm' variant='outline-primary' id='editBtn' onClick={()=>setEditStatus(true)} >Edit Status </Button> 
        </td>
      }
    </tr>
  )
}

export default SingleJob