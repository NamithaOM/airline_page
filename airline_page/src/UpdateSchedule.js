import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'

function UpdateSchedule() {
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

    let companyId = authenticated._id;
    const location = useLocation()
    console.log(location);
    const navigate = useNavigate();

    useEffect(() => {
        let scheduleId = {
            id: location.state.id
        }
        fetch('http://localhost:5001/findschedule', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(scheduleId)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            setFlight(result.flight)
            setAdate(result.Adate)
            setAtime(result.Atime)
            setDdate(result.Ddate)
            setDtime(result.Dtime)
            setRdate(result.Rdate)
            setSource(result.source)
            setDestiny(result.destiny)

        })
    }, [])

    const updateschedule=(e) => {
        e.preventDefault()
        navigate('/viewschedule');

        let scheduleData = {
            id: location.state.id,
            Adates: Adate,
            Atimes: Atime,
            Ddates: Ddate,
            Dtimes: Dtime,
            Rdates: Rdate,
            sources: source,
            destinys: destiny,
            // flightcls: flightclass,
        }
        fetch('http://localhost:5001/updateschedule', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body: JSON.stringify(scheduleData)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
        })
    }


    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <h2>Update Schedule</h2>
                <form method="post" onSubmit={updateschedule}>
                Flight name<input type="text" name="flights" className="form-control"
                      value=""></input> 
                Arrival Date<input type="date" name="Adates" className="form-control"
                    value={Adate}  onChange={(e) => setAdate(e.target.value)}></input>
                    Arrival time <input type="time" name="Atimes" className="form-control"
                      value={Atime}  onChange={(e) => setAtime(e.target.value)}></input>
                    Departure Date <input type="date" name="Ddates" className="form-control"
                       value= {Ddate} onChange={(e) => setDdate(e.target.value)}></input>
                    Departure Time <input type="time" name="Dtimes" className="form-control"
                       value={Dtime} onChange={(e) => setDtime(e.target.value)}></input>
                    Return Date & Time <input type="date" name="Rdates" className="form-control"
                       value={Rdate} onChange={(e) => setRdate(e.target.value)}></input>
                    Source <input type="text" name="sources" className="form-control"
                       value={source} onChange={(e) => setSource(e.target.value)}></input>
                    Destination <input type="text" name="destinys" className="form-control"
                      value={destiny}  onChange={(e) => setDestiny(e.target.value)}></input>

                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
export default UpdateSchedule