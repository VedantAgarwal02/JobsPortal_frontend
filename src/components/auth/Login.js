import React, {useState} from 'react'
import './Login.css'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmployer, setIsEmployer] = useState(true)

  const handleSubmit = async (e)=> {
    e.preventDefault()

    const role=isEmployer?'employer':'seeker';
    // let flag=true

    try{

        if(!email || !password) {
            alert('Please enter both email and password')
            return
        }

        const resp = await axios.post('https://jobsportal-backend.onrender.com/api/v1/auth/login', {email, password, role})
        Cookies.set('token', resp.data.token);
        if(role==='employer') {
            const employerData = resp.data.employer
        window.localStorage.setItem('user', JSON.stringify({name:employerData.name, companyName:employerData.companyName, _id:employerData._id, role}))
        }
        else {
            const seekerData = resp.data.seeker
            window.localStorage.setItem('user', JSON.stringify({name:seekerData.name,qualification:seekerData.qualification, _id:seekerData._id, role}))
        }
        // setUser({...employerData, role})
        navigate(`/home/${role}`)
    }
    catch(error) {
        console.log(error)
        alert('Wrong Credentials')
    }

  }

  return (
    <form className='loginForm'> 
        <section key={`inline-radio`} className="mb-3">

            <label htmlFor="radio" style={{padding:'2px'}}>Select your Role : </label>
            <Form.Check
            inline
            label="Employer"
            name="radio"
            defaultChecked
            type='radio'
            id={`inline-radio-1`}
            onClick={()=>setIsEmployer(true)}
            />

            <Form.Check
            inline
            label="Job Applicant"
            name="radio"
            type='radio'
            id={`inline-radio-2`}
            onClick={()=> setIsEmployer(false)}
            />
        </section>

        <FloatingLabel
            controlId="floatingInput1"
            label="Email address"
            className="mb-3 formItem"
        >
            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </FloatingLabel>

        <FloatingLabel
            controlId="floatingInput2"
            label="Password"
            className="mb-3 formItem"
        >
            <Form.Control type="password" placeholder="name@example.com" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </FloatingLabel>

        <Button variant="primary" type="submit" id='submitBtn' onClick={handleSubmit}>
            Submit
        </Button>
    </form>
  )
}

export default Login
