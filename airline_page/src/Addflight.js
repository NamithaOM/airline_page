import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'


function Addflight() {
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [flightName, setFlightName] = useState('')
    const [seats, setSeats] = useState('')
    const navigate = useNavigate();

    const addflights = (e) => {
        e.preventDefault()
        navigate('/flightview');

        let companyId = authenticated._id

        let flightData = {
            flightName: flightName,
            seats: seats,
            companyID: companyId
        }
        fetch('http://localhost:5001/addflight', {
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


                <form method="post" onSubmit={addflights}>
                    Flight name <input type="text" name="flightName" className="form-control"
                        onChange={(e) => setFlightName(e.target.value)}></input>
                    No.of Seats <input type="text" name="seats" className="form-control"
                        onChange={(e) => setSeats(e.target.value)}></input>

                    <button type="submit">Submit</button>


                </form>
            </div>


            <Footer />
        </>

    )

}
export default Addflight