import axios from 'axios';
import React from 'react'
import Button from 'react-bootstrap/Button';
import link from '../../backendLink';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const JobDescription = ({job, user, showAlert, showLoading}) => {
  const navigate=useNavigate()
  const editBtnStyle = {
    width:'10%',
    border:'1px solid ',
    marginRight:'1%'
  }
  
  const deleteBtnStyle = {
    width:'10%',
    border:'1px solid '
  }

  const handleEdit = ()=>{
    navigate(`/job/edit/${job._id}`)
  }

  const handleDelete = async () => {
    // console.log(window.confirm('Are you sure you want to delete this job posting?'))4
    if(!window.confirm('Are you sure you wish to delete this job posting?')) 
    return 

    showLoading(true, 'Deleting Job')
    try {
      const resp = await axios.delete(`${link}/api/v1/job/${job._id}`, {
        headers:{
          Authorization:`Bearer ${Cookies.get('token')}`
        }
      })

      if(resp.data.success) {
        
        const resp1 = await axios.delete(`${link}/api/v1/application/${job._id}`, {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
          }
        })
        
        if(resp1.data.success)
        showAlert('success', 'Job Deleted')

      }
    }
    catch(error) {
      showAlert('danger', 'Error Occured')
    }

    showLoading(false)
    navigate(`/${user.role}`)
  }

  return (
    <div>
        <section className="singleJob">
        <h3>  Details of Job:</h3>

        <table className='jobDetails'>
          <tr>
            
            <td> <h4>Job Title :</h4> </td>
            <td> <h4> {job?.jobTitle} </h4> </td>
            
          </tr>
          <tr>
            
            <td> <h5> Company Name : </h5> </td>
            <td> <h5> {job?.companyName} </h5> </td>
            
          </tr>
          <tr>
            
            <td> <h5> Mode of Job : </h5> </td>
            <td> <h5> {job?.mode==='online' ? 'Online' : "On-site"} </h5> </td>
            
          </tr>
          <tr>
            
            <td> <h5> Type of Job : </h5> </td>
            <td> <h5> {job?.type==='tech' ? 'Tech' : "Non-Tech"} </h5> </td>
            
          </tr>
          <tr>
            
            <td> <h5> Package Offered : </h5> </td>
            <td> <h5> {job?.package}LPA </h5> </td>
            
          </tr>
          <tr>
            
            <td> <h5> Number of Applications : </h5> </td>
            <td> <h5> {job?.totalApplications} </h5> </td>
            
          </tr>
          </table>

          
        {
          user?.role==='employer' 
          ?
          <section className="buttons" style={{display:'flex', marginTop:'1%'}} >
             <Button variant='outline-success' id="edit" style={editBtnStyle} onClick={handleEdit} size='sm' title='Edit Button' > 
             <FontAwesomeIcon icon={faPenToSquare} size='xl' style={{"--fa-primary-color": "#000000", "--fa-secondary-color": "#0a74ff",}} />
             </Button>
             <Button variant='outline-danger' id="delete" style={deleteBtnStyle} onClick={handleDelete} > 
             <FontAwesomeIcon icon={faTrash} size="lg" />
             </Button>
          </section>
        :
        <></>
        }
        
      </section>
    </div>
  )
}

export default JobDescription