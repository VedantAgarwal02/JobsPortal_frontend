import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AllApplications.css'
import { normalizeText } from '../../textConverter';
import link from '../../backendLink'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faLink } from '@fortawesome/free-solid-svg-icons'

const AllApplications = ({showLoading, showAlert}) => {
  const [user, setUser] = useState()
  const [applications, setApplications] = useState([])
  const fetchData =  async ()=> {
    showLoading(true, `Fetching all Applications...`)
    try {
      const resp = await axios.get(`${link}/api/v1/application/`, {
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

    showLoading(false, 'random')
  }

  const removeApplication = (id) => {
    setApplications(applications.filter(app => app._id !== id))
  }

  useEffect(()=> {
    setUser(JSON.parse(window.localStorage.getItem('user')))
    fetchData()
  }, [])
  return (
    <div >
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
              return <ApplicationCard key={application._id} application={application} removeApplication={removeApplication} showLoading={showLoading} showAlert={showAlert} />
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

const ApplicationCard = ({application, showLoading, showAlert, removeApplication})=> {
  const navigate = useNavigate()

  const deleteApp = async() => {

    if(!window.confirm('Are you sure you wish to delete your application?'))
    return

    showLoading(true, 'Deleting Application')
    try {
      const resp = await axios.delete(`${link}/api/v1/application/${application.jobId}/${application._id}`, {
        headers:{
          Authorization:`Bearer ${Cookies.get('token')}`
        }
      });
      console.log(resp)
      if(resp.data.success) {
        showAlert('success', 'Application Deleted')
        removeApplication(application._id)
      }
    }
    catch(error) {
      showAlert('danger', 'Error Occured')
    }

    showLoading(false);
  }
  return (
    <tr >
      <td>{normalizeText(application.companyName)}</td>
      <td>{normalizeText(application.jobTitle)}</td>
      <td>{normalizeText(application.status)}</td>
      <td> <a href={application.resume}>Link</a> </td>
      <td>
      <FontAwesomeIcon icon={faLink} onClick={()=>navigate(`/${application.jobId}/apply`)} />
      </td>
      <td>
        <FontAwesomeIcon id='deleteApp' icon={faTrash} size="lg" onClick={deleteApp} style={{cursor:'pointer'}} />
      </td>
    </tr>
  )
}

export default AllApplications