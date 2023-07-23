import React from 'react'
import './DashCenter.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const DashCenter = ({buttonVal, navFunc}) => {
    const navigate = useNavigate()
  return (
    <div>
        <section className="main"> 
            <h1> Welcome to Jobs Portal </h1> 
            <h4>Your One Stop to find Dream Job</h4>

            <h3>To get Started : <Button variant="outline-primary" onClick={() => navFunc()}>{buttonVal}</Button> </h3>
        </section>
    </div>
  )
}

export default DashCenter