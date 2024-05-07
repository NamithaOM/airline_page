import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
function UpdateFare(){
    const location = useLocation()
    console.log(location);
    
    useEffect(() => {
        let fareid = {
            id: location.state.id
        }
        fetch('http://localhost:5001/findfare', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(fareid)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            // setFlightName(result.flight_Name)
            // setSeats(result.seats)
        })
    }, [])
    return(
        <>
        <CommonHeader/>
        <div>
            <CompanySidebar/>
        <h2>Ticket Fair</h2>

        </div>
<Footer/>
        </>
    )

}
export default UpdateFare