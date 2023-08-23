import React, {useState, useEffect} from "react";
import DashboardNav from "./DashboardNav";
import DashCenter from "./DashCenter";
import Features from "./Features";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [buttonVal, setButtonVal] = useState('Login/Signup')
  const navFunc = () => {
    if(Cookies.get('token'))
    navigate(`/${user?.role}`)
    else
    navigate('/auth')
  }
  useEffect(()=> {
    if(Cookies.get('token')) {
      setUser(JSON.parse(window.localStorage.getItem('user')))
      setButtonVal('Go to Home')
    }
  })
  
  return (
    <>
      <DashboardNav navFunc={navFunc} buttonVal={buttonVal} />

      <DashCenter navFunc={navFunc} buttonVal={buttonVal} />

    </>
  );
}

export default Dashboard;
