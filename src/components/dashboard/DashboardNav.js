import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from "react-router-dom";
import ShowAlert from '../Alert';

const DashboardNav = ({navFunc, buttonVal}) => {
  const navigate = useNavigate()
  
  return (
    <div>
        <Navbar expand="sm" bg="dark" data-bs-theme="dark" className="bg-body-secondary">
            <Container fluid>
            <Navbar.Brand onClick={() => navigate('/')}> <Nav.Link> Jobs Portal </Nav.Link> </Navbar.Brand> 
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link onClick={()=> navigate('/aboutus')}>About Us</Nav.Link>
                </Nav>
                <Form className="d-flex"> 
                <Button variant="outline-success" onClick={() => navFunc()}>{buttonVal}</Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        {/* <ShowAlert variant={'success'} msg={"abc"} /> */}
    </div>
  )
}

export default DashboardNav