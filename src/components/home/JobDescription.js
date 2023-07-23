import React from 'react'

const JobDescription = ({job}) => {
  return (
    <div>
        <section className="singleJob">
        <h3>Details of Job:</h3>

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
      </section>
    </div>
  )
}

export default JobDescription