import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
function Schedule() {
    const[Adate,setAdate]=useState('')
    const[Atime,setAtime]=useState('')
    const[Ddate,setDdate]=useState('')
    const[Dtime,setDtime]=useState('')
    const[Rdate,setRdate]=useState('')
    const[source,setSource]=useState('')
    const[destiny,setDestiny]=useState('')
    const[flight,setFlight]=useState([])
    const[flightId,setFlightId]=useState('')
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
    const navigate = useNavigate();

    let companyId = authenticated._id;

    const addShedule = (e) => {
        e.preventDefault();
        navigate('/viewschedule');

        let scheduleData = {
            flight:flightId,
            Adate: Adate,
            Atime: Atime,
            Ddate: Ddate,
            Dtime: Dtime,
            Rdate: Rdate,
            source: source,
            destiny: destiny,
            companyId: companyId
        };
    
        fetch('http://localhost:5001/addschedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheduleData)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        
    };
    useEffect(() => {
        fetch('http://localhost:5001/viewschedule', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId: companyId })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setFlight(result.flightResult);
        })
        .catch(err => console.error(err));
    }, []);
    
    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />

                <form method="post" onSubmit={addShedule}>
                    Flight<select name='flight' value={flightId} className="form-control"
                        onChange={(e) => setFlightId(e.target.value)}>
                        <option>Select</option>
                        {flight.map((datas) => (
                            <option value={datas._id}>
                                {datas.flight_Name}
                            </option>
                        ))}
                    </select>


                    Arrival Date<input type="date" name="Adate" className="form-control"
                        onChange={(e) => setAdate(e.target.value)}></input>
                    Arrival time <input type="time" name="Atime" className="form-control"
                        onChange={(e) => setAtime(e.target.value)}></input>
                    Departure Date <input type="date" name="Ddate" className="form-control"
                        onChange={(e) => setDdate(e.target.value)}></input>
                    Departure Time <input type="time" name="Dtime" className="form-control"
                        onChange={(e) => setDtime(e.target.value)}></input>
                    Return Date & Time <input type="date" name="Rdate" className="form-control"
                        onChange={(e) => setRdate(e.target.value)}></input>
                    Source <input type="text" name="source" className="form-control"
                        onChange={(e) => setSource(e.target.value)}></input>
                    Destination <input type="text" name="destiny" className="form-control"
                        onChange={(e) => setDestiny(e.target.value)}></input>

                    <button type="submit">Submit</button>


                </form>
            </div>


            <Footer />
        </>
    )


}
export default Schedule