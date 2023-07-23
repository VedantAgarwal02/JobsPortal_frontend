import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState(false);
  // useEffect(()=> {
  //   setUser(window.localStorage.getItem('user'))
  // },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path='home' element={
            <ProtectRoute >
              <SharedLayout  />
            </ProtectRoute>
          } >
              
                <Route path='/home/seeker' element={<Seeker />} />
                
                <Route path='/home/employer' element={<Employer />} />
              
          </Route>

          <Route path='/job/:jobId' element={<ProtectRoute ><SingleJob /></ProtectRoute>} />

          <Route path='/job/create' element={<ProtectRoute><CreateJob /></ProtectRoute>} />

          <Route path='/:jobId/apply' element={<ProtectRoute><CreateApplication /></ProtectRoute>} />

          <Route path='/:userId/applications' element={<ProtectRoute><AllApplications /></ProtectRoute>} />

          <Route path='aboutus' element={<ProtectRoute><About /></ProtectRoute>} />
          
          <Route path='/' element={<Dashboard />} />

          
          <Route path='/profile/seeker/:seekerId' element={<ProtectRoute ><SeekerProfile /></ProtectRoute>} />
          
          <Route path='/profile/employer/:empId' element={<ProtectRoute ><EmployerProfile /></ProtectRoute>} />
          

          <Route path='auth' element={<Auth />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
