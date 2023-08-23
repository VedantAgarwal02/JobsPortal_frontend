import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import link from '../../backendLink';

const Signup = ({showLoading, showAlert}) => {
  const navigate = useNavigate()
  const [isEmployer, setIsEmployer] = useState(true)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const role = isEmployer?'employer':'seeker'
    const name=document.getElementById('name').value
    const companyName=document.getElementById('companyName')?.value
    const qualification=document.getElementById('qualification')?.value
    const email=document.getElementById('email')?.value
    const number=document.getElementById('number')?.value
    const password=document.getElementById('password')?.value
    const confirmPassword=document.getElementById('confirmPassword')?.value

    showLoading(true, 'Signing Up...')
    
    if(!name || !email || !number || !password || !confirmPassword || password!==confirmPassword) {
      showLoading(false, 'random')
      alert("Please enter all the details")
      return
    }
    if(role==='employer' && !companyName) {
      showLoading(false, 'random')
      alert("Please enter all the details")
      return
    }
    else if(role==='seeker' && !qualification) {
      showLoading(false, 'random')
      alert("Please enter all the details")
      return
    }
    
    if(role==='employer') {
      try {
        const resp = await axios.post(`${link}/api/v1/auth/signup`, {name, role, email, number, password, confirmPassword, companyName});
        Cookies.set('token', resp.data.token)
        const empData = resp.data.newEmployer
        window.localStorage.setItem('user', JSON.stringify({...empData, role}))
        showAlert('success', 'Signup Success')
        navigate(`/${role}`)
      }
      catch(error) {
        console.log(error)
        showAlert('danger', 'Some error occured while signing up, Please try again.')
      }
    }
    else {
      try{
        const resp = await axios.post(`${link}/api/v1/auth/signup`, {name, role, email, number, password, confirmPassword, qualification})
        Cookies.set('token', resp.data.token)
        const seekerData = resp.data.newSeeker
        window.localStorage.setItem('user', JSON.stringify({...seekerData, role}))
        showAlert('success', 'Signup Success')
        navigate(`/${role}`)
      }
      catch(error) {
        console.log(error)
        showAlert('danger', 'Some error occured while signing up, Please try again.')
      }
    }
    showLoading(false, 'random')
  }

  return (
    <form className='loginForm'> 
        <section key='inline-radio' className="mb-3">

            <label htmlFor="radio" style={{padding:'2px'}} id='radio'>Select your Role : </label>
            <Form.Check
            inline
            label="Employer"
            name="radio"
            type='radio'
            defaultChecked
            id='inline-radio-1'
            onClick={()=>setIsEmployer(true)}
            />

            <Form.Check
            inline
            label="Job Applicant"
            name="radio"
            type='radio'
            id='inline-radio-2'
            onClick={()=>setIsEmployer(false)}
            />
        </section>

        <FloatingLabel
            label="Name"
            className="mb-3 formItem"
        >
            <Form.Control id='name' type="name" placeholder="name@example.com" />
        </FloatingLabel>

        {isEmployer 
          ? 
          <FloatingLabel
            label="Company Name"
            className="mb-3 formItem"
          >
            <Form.Control id='companyName' type="companyName" placeholder="name@example.com" />
          </FloatingLabel> 
          : 
          <FloatingLabel label="Qualification" className='mb-3 formItem'>
            <Form.Select id='qualification' aria-label="Floating label">
              <option>Open this select menu</option>
              <option value="highSchool">High School</option>
              <option value="secondarySchool">Secondary School</option>
              <option value="graduate">Graduate</option>
              <option value="postGraduate">Post Graduate</option>
            </Form.Select>
          </FloatingLabel>
        }

        <FloatingLabel
            label="Email address"
            className="mb-3 formItem"
        >
            <Form.Control id='email' type="email" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel
            label="Phone Number"
            className="mb-3 formItem"
        >
            <Form.Control id='number' type="number" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel
            label="Password"
            className="mb-3 formItem"
        >
            <Form.Control id='password' type="password" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel
            label="Confirm Password"
            className="mb-3 formItem"
        >
            <Form.Control id='confirmPassword' type="password" placeholder="name@example.com" />
        </FloatingLabel>

        <Button variant="primary" type="submit" id='submitBtn' onClick={handleSubmit}>
            Submit
        </Button>
    </form>
  )
}

export default Signup