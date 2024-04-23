import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'

function UpdateClass() {
    const [flightclass, setFlightclass] = useState('')
    const location = useLocation()
    console.log(location);
    const navigate = useNavigate();

    useEffect(() => {
        let classid = {
            id: location.state.id
        }
        fetch('http://localhost:5001/findclass', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(classid)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            setFlightclass(result.flight_class)
        })
    }, [])

    const update_class = (e) => {
        e.preventDefault()
        navigate('/viewclass');

        let classData = {
            id: location.state.id,
            flightcls: flightclass,
        }
        fetch('http://localhost:5001/updateclass', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body: JSON.stringify(classData)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
        })
    }


    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <h2>Update Class</h2>
                <form method="post" onSubmit={update_class}>
                    Class <input type="text" name="flightcls" className="form-control"
                    value={flightclass}  onChange={(e) => setFlightclass(e.target.value)}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
export default UpdateClass