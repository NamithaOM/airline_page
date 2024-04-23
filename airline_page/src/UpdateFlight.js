import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";

import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'


function UpdateFlight() {
    const location = useLocation()
    console.log(location);
    const [flightName, setFlightName] = useState('')
    const [seats, setSeats] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        let flightid = {
            id: location.state.id
        }
        fetch('http://localhost:5001/findFlight', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(flightid)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            setFlightName(result.flight_Name)
            setSeats(result.seats)
        })
    }, [])

    const updateflight = (e) => {
        e.preventDefault()
        navigate('/flightview');

        let flightData = {
            id: location.state.id,
            flightNames: flightName,
            seat: seats,
        }
        fetch('http://localhost:5001/updateFlight', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body: JSON.stringify(flightData)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
        })

    }


    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />


                <form method="post" onSubmit={updateflight}>
                    Flight name <input type="text" name="flightNames" className="form-control"
                        value={flightName} onChange={(e) => setFlightName(e.target.value)}></input>
                    No.of Seats <input type="text" name="seat" className="form-control"
                        value={seats} onChange={(e) => setSeats(e.target.value)}></input>

                    <button type="submit">Submit</button>


                </form>
            </div>


            <Footer />
        </>

    )

}
export default UpdateFlight