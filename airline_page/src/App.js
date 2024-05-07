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
import UpdateCompany from './UpdateCompany';
import CompanyHome from './CompanyHome'
import CompanySidebar from './CompanySidebar'
import CompanyProfile from './CompanyProfile'
import FlightView from './FlightView'
import Addflight from './Addflight';
import AddClass from './AddClass'
import ViewClass from './ViewClass'
import UpdateFlight from './UpdateFlight'
import UpdateClass from './UpdateClass'
import ViewFare from './ViewFare'
import AddFare from './AddFare';
import UpdateFare from './UpdateFare'
import AddPackage from './AddPackage';
import ViewPackage from './ViewPackage';
import UpdatePackage from './UpdatePackage';
import Schedule from './Schedule'
import ViewSchedule from './ViewSchedule'
import UpdateSchedule from './UpdateSchedule'
import SearchFlights from './SearchFlights'
import AddPassenger from './AddPassenger'

function App() {
 
 
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
  return (
    <BrowserRouter>
      {authenticated == null ? (
        <>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

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
<Route path='/updatecompany' element={<UpdateCompany/>}></Route>
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
          <Route path='/serchflights' element={<SearchFlights/>}></Route>
          <Route path='/addpassenger' element={<AddPassenger/>}></Route>


        </Routes>
        </>
      ) : (
        // company
        
        <>
        <Routes>
          
           {/* <Route path='/' element={<Login />}></Route> */}
           <Route path='/commonheader' element={<CommonHeader/>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/about' element={<About/>}></Route> 
          <Route path='/features' element={<Features />}></Route>
          <Route path='/footer' element={<Footer/>}></Route>
          <Route path='/' element={<CompanyHome/>}></Route>
          <Route path='/companySidebar' element={<CompanySidebar/>}></Route>
          <Route path='/profile' element={<CompanyProfile/>}></Route>
          <Route path='/flightview' element={<FlightView/>}></Route>
          <Route path='/addflight' element={<Addflight/>}></Route>
          <Route path='/addclass' element={<AddClass/>}></Route>
          <Route path='/updateflight' element={<UpdateFlight/>}></Route>
          <Route path='/viewclass' element={<ViewClass/>}></Route>
          <Route path='/updateclass' element={<UpdateClass/>}></Route>
          <Route path='/viewfare' element={<ViewFare/>}></Route>
          <Route path='/addfare' element={<AddFare/>}></Route>
          <Route path='/updatefare' element={<UpdateFare/>}></Route>
          <Route path='/addpackage' element={<AddPackage/>}></Route>
          <Route path='/viewpackage' element={<ViewPackage/>}></Route>
          <Route path='/updatepackage' element={<UpdatePackage/>}></Route>
          <Route path='/addschedule' element={<Schedule/>}></Route>
          <Route path='/viewschedule' element={<ViewSchedule/>}></Route>
          <Route path='/updateschedule' element={<UpdateSchedule/>}></Route>

        </Routes>
        </>
      )
      }

    </BrowserRouter>
  );

}

export default App;


