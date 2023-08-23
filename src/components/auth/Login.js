import React, {useState} from 'react'
import './Login.css'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import link from '../../backendLink';

function Login({showLoading, showAlert}) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmployer, setIsEmployer] = useState(true)

  const handleSubmit = async (e)=> {
    e.preventDefault()

    const role=isEmployer?'employer':'seeker';
    // let flag=true

    try{

        showLoading(true, 'Logging In...')

        if(!email || !password) {
            showLoading(false, 'random')
            alert('Please enter both email and password')
            return
        }

        const resp = await axios.post(`${link}/api/v1/auth/login`, {email, password, role})
        // console.log(resp)
        Cookies.set('token', resp.data.token);
        if(role==='employer') {
            const employerData = resp.data.employer
            window.localStorage.setItem('user', JSON.stringify({...employerData, role}))
        }
        else {
            const seekerData = resp.data.seeker
            window.localStorage.setItem('user', JSON.stringify({...seekerData, role}))
        }
        // setUser({...employerData, role})
        showLoading(false, 'random')
        showAlert('success', 'Login Success')
        navigate(`/${role}`)
    }
    catch(error) {
        console.log(error)
        // alert('Wrong Credentials')
        showLoading(false, 'random')
        showAlert('danger', 'Login Failed')
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
