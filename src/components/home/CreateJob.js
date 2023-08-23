import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './CreateJob.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import link from '../../backendLink';

const CreateJob = ({showLoading, showAlert}) => {

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
    
    showLoading(true, 'Creating Job')
    try {
      const resp = await axios.post(`${link}/api/v1/job/`, {jobTitle, mode, type, package:pckg, employerId:user?._id, companyName:user?.companyName}, {
        headers :{
          'Authorization':`Bearer ${Cookies.get('token')}`
        }
      })
      showAlert('success', 'Job Posted Successfully')
    }
    catch(error) {
      console.log(error)
      showAlert('danger', 'Some Error Occured while posting job.')
    }

    showLoading(false, 'random')
    
    if(flag)
    navigate(`/${user.role}`)
  }
  return (
    <div>
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

export default CreateJob