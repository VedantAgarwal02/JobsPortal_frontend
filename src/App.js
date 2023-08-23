import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SharedLayout from './components/home/SharedLayout';
import About from './components/About';
import ProtectRoute from './components/ProtectRoute';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import NotFound from './components/NotFound';
import Employer from './components/home/Employer';
import Seeker from './components/home/Seeker';
import SingleJob from './components/home/SingleJob'
import EmployerProfile from './components/profilePages/EmployerProfile'
import SeekerProfile from './components/profilePages/SeekerProfile'
import CreateApplication from './components/home/CreateApplication'
import CreateJob from './components/home/CreateJob'
import AllApplications from './components/home/AllApplications';
import ShowAlert from './components/Alert';
import Loading from './components/Loading';
import './App.css'
import HomeRedirect from './components/HomeRedirect';
import EditJob from './components/home/EditJob';

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [alrtMessage, setAlrtMessage] = useState('')
  const [variant, setVariant] = useState('')
  const showLoading = function(value, msg='random') {
    if(value) {
      setMessage(msg)
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }
  
  const showAlert = async function(vari, msg) {
    setAlert(true)
    setAlrtMessage(msg)
    setVariant(vari)
    
    setTimeout(function(){
      setAlert(false)
    }, 2000)

  }

  return (
    <div className="App">
      <div id="messages">
      {isLoading && <Loading msg={message} id='loading' />}
      {alert && <ShowAlert variant={variant} msg={alrtMessage} id='alert' />}
      </div>
      <BrowserRouter>
        <Routes>
         
          <Route path='/' element={
            <ProtectRoute >
              <SharedLayout  />
            </ProtectRoute>
          } >
                <Route index element={<HomeRedirect />} />
                <Route path='/seeker' element={<Seeker showLoading={showLoading} showAlert={showAlert} />} />
                <Route path='/employer' element={<Employer showLoading={showLoading} showAlert={showAlert} />} />
              
                <Route path='/job/:jobId' element={<SingleJob showLoading={showLoading} showAlert={showAlert} />} />
                <Route path='/job/create' element={<CreateJob showLoading={showLoading} showAlert={showAlert} />} />
                <Route path='/job/edit/:jobId' element={<EditJob showLoading={showLoading} showAlert={showAlert} />} />
                <Route path='/:jobId/apply' element={<CreateApplication showLoading={showLoading} showAlert={showAlert} />} />
                <Route path='/:userId/applications' element={<AllApplications showLoading={showLoading} showAlert={showAlert}  />} />
                <Route path='/profile/seeker/:seekerId' element={<ProtectRoute ><SeekerProfile /></ProtectRoute>} />

                
                <Route path='/profile/employer/:empId' element={<ProtectRoute ><EmployerProfile /></ProtectRoute>} />
          </Route>

          <Route path='aboutus' element={<About />} />
          
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/auth' element={<Auth showLoading={showLoading} showAlert={showAlert} />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
