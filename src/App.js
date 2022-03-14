import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage'
import HomeRegistrationContainer from './pages/home_registration_container/home_registration_container'
import Navbar from './components/navbar.component/navbar'
import {Routes,Route} from 'react-router-dom'
// import {useIsAuthenticated} from '@azure/msal-react'



function App() {

  // useIsAuthenticated hook is used to conditionally render the component
  // the components that depend on whether the user is authenticated should be wrapped inside
  //  React's AuthenticatedTemplate and UnauthenticatedTemplate components. 
  // Alternatively, you may use the useIsAuthenticated hook to conditionally render components.
  // const isUserAuthenticated= useIsAuthenticated();

  return (
    <div>
     <div>
     <Navbar/>
       <Routes>
        <Route  path="/" element={<HomePage/>} /> 
        {/* <Route path="/register/devices" element={isUserAuthenticated?<HomeRegistration/>:<Navigate to='/'/>} /> */}
        <Route path="device_categories/*" element={<HomeRegistrationContainer/>} />
      </Routes>
     </div>
    </div>
  );
}

export default App;
