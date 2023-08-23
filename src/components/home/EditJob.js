import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './EditJob.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import link from '../../backendLink';

const EditJob = ({showLoading, showAlert}) => {
    // const [user, setUser] = useState()
    const [job, setJob] = useState({jobTitle:'...', companyName:'...', package:'-', totalApplications:'-'})
    const params = useParams()
    const navigate=useNavigate()
    
    const fetchJob = async() => {
      showLoading(true, 'Loading Existing Details')
        try {
            const resp = await axios(`${link}/api/v1/job/${params.jobId}`, {
                headers : {
                    Authorization : `Bearer ${Cookies.get('token')}`
                }
            })
            
            if(resp.data.success){

                setJob(resp.data.job)
                setTitle(resp.data.job.jobTitle)
                setMode(resp.data.job.mode)
                setType(resp.data.job.type)
                setPackage(resp.data.job.package)
            }
            else {
                console.log("some error occurred")
            }
        }
        catch(error) {
            showAlert('danger', 'Error Occured')
            console.log(error)
        }

        showLoading(false)
    }
    useEffect(() => {
        // setUser(JSON.parse(window.localStorage.getItem('user')))

        const tempUser=JSON.parse(window.localStorage.getItem('user'))

        if(tempUser?.role !== 'employer') {
            navigate(`/${tempUser?.role}`)
        }
        fetchJob()
    }, [])

    const [title, setTitle] = useState(job?.jobTitle)
    const [mode, setMode] = useState(job?.mode)
    const [type, setType] = useState(job?.type)
    const [pckg, setPackage] = useState(job?.package)
  
    const handleSubmit =async()=> {
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
      
      showLoading(true, 'Editting Job')
      try {
        const resp = await axios.patch(`${link}/api/v1/job/${job._id}`, {jobTitle, mode, type, package:pckg}, {
          headers :{
            'Authorization':`Bearer ${Cookies.get('token')}`
          }
        })

        if(resp.data.success)
        showAlert('success', 'Job Editted Successfully')
      }
      catch(error) {
        console.log(error)
        showAlert('danger', 'Some Error Occured')
      }
  
      showLoading(false, 'random')
      
      if(flag)
      navigate(`/job/${job._id}`)
    }
    return (
      <div>
        <section className="editJob">
        <h3>Edit Job :</h3>
        <p>(Edit only required details and leave the rest as it is.)</p>
        <form action="">
          <FloatingLabel
            label="Job Title*"
            className="mb-3"
          >
            <Form.Control id='jobTitle' type="text" placeholder="name@example.com" value={title} onChange={e => setTitle(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel label="Mode of Job*" className='mb-3'>
            <Form.Select id="mode" aria-label="Floating label" value={mode} onChange={e => setMode(e.target.value)} >
              <option>Open this select menu</option>
              <option value="online">Online</option>
              <option value="on-site">On-site</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="Type of Job*" className='mb-3'>
            <Form.Select id='type' aria-label="Floating label" value={type} onChange={e => setType(e.target.value)} >
              <option>Open this select menu</option>
              <option value="tech">Tech</option>
              <option value="non-tech">Non-Tech</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            label="Package Offered (in LPA)*"
            className="mb-3"
          >
            <Form.Control id='package' type="number" placeholder="name@example.com" value={pckg} onChange={e => setPackage(e.target.value)} />
          </FloatingLabel>
  
          <Button onClick={()=>handleSubmit()}>Submit</Button>
        </form>
        </section>
      </div>
    )
}

export default EditJob