import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './Components/Users/Login';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home';
import Signup from './Components/Users/Signup';
import AdminLogin from './Components/Admin/AdminLogin';
import Profile from './Components/Users/Profile';
import { jwtDecode } from "jwt-decode"
import Admin from './Components/Admin/Admin';
import EditProfile from './Components/Users/EditProfile';

function App() {
  
  
  const [extUser, setExtUser] = useState()


  useEffect(() => {
    const getUser = localStorage.getItem("user_token");
    if (getUser) {
      let decodedToken = jwtDecode(getUser);
      let somevar = JSON.parse(JSON.stringify(decodedToken));
      setExtUser(somevar);
      
      // Update user state only when the user logs in
    }
  }, []);


  


  return (
    <>
      <BrowserRouter>
        {/* <Navbar extUser={extUser} user={user} setUser={setUser} setExtUser={setExtUser} /> */}
        <Navbar></Navbar>
        <Routes>
          {/* Use 'element' instead of 'Component', and capitalize 'component' */}
          <Route path="/" element={<Home></Home>} />
          <Route path="/auth" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/admin' element={<Admin></Admin>} />
          <Route path='/profilepage' element={<Profile></Profile>} />
          <Route path='profileedit' element={<EditProfile extUser={extUser}></EditProfile>} />
        </Routes>
      </BrowserRouter>



    </>
  );
}

export default App;
