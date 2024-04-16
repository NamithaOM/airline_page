import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AirlineHome from './AirlineHome'
import Login from './Login'
import Register from './Register';
import About from './About';
import Features from './Features';
import AdminHome from './AdminHome';
import { useState } from 'react';
import AdminHeader from './AdminHeader';
import UserHeader from './UserHeader';
import CommonHeader from './CommonHeader';
import AddCompany from './AddCompany'
import CompanyView from './CompanyView';
import Footer from './Footer';
function App() {
 
 
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
  return (
    <BrowserRouter>
      {authenticated == null ? (
        <>
        <Routes>
          <Route path='/' element={<Login />}></Route>
        </Routes>
        </>
      ) : authenticated.user_status == 0 ? (
        // admin
        <>
        <Routes>
          <Route path='/' element={<AdminHome />}></Route>
          <Route path='/adminHeader' element={<AdminHeader/>}></Route>
          <Route path='/addcompany' element={<AddCompany/>}></Route> 
          <Route path='/companyview' element={<CompanyView/>}></Route> 
          <Route path='/footer' element={<Footer/>}></Route>

        </Routes>
        </>
      ) : authenticated.user_status == 1 ? (
        // user
        <>
        <Routes>
          <Route path='/' element={<AirlineHome />}></Route>
          {/* <Route path='/' element={<About />}></Route> */}
          <Route path='/userHeader' element={<UserHeader/>}></Route>
          <Route path='/features' element={<Features />}></Route>
          <Route path='/footer' element={<Footer/>}></Route>

        </Routes>
        </>
      ) : (
        // outsiders
        
        <>
        <Routes>
          
           {/* <Route path='/' element={<Login />}></Route> */}
           <Route path='/' element={<CommonHeader/>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/about' element={<About />}></Route> 
          <Route path='/features' element={<Features />}></Route>
          <Route path='/footer' element={<Footer/>}></Route>

        </Routes>
        </>
      )
      }

    </BrowserRouter>
  );

}

export default App;


