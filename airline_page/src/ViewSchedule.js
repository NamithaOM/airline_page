import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'

function ViewSchedule() {

    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [scheduledt, setScheduledt] = useState([])
    let companyId = authenticated._id
    const navigate = useNavigate();
    // console.log(companyId);

    useEffect(() => {
        fetch('http://localhost:5001/viewschedule', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId })
        }).then((res) => res.json()).then((result) => {
            // console.log(result);

            setScheduledt(result.scheduleResult)

        })
    }, [])

    const deleteSchedule = (iD) => {
        navigate('/viewschedule');

        let delId = {
            id: iD
        }
        // console.log(delId);
        fetch('http://localhost:5001/deleteschedule', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(delId)
        }).then((res) => res.json()).then((result) => {
            // console.log(result);
        })

    }

    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <form method="post">
                    <Link to='/addschedule'><button className="btn btn-light" type="submit" style={{ marginLeft: "1000px" }}>Add Schedule</button></Link>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sl.no</th>
                                <th scope="col">Flight name</th>
                                <th scope="col">Arraival Date</th>
                                <th scope="col">Arraival time</th>
                                <th scope="col">Departure date</th>
                                <th scope="col">Departure time</th>
                                <th scope="col">Return Date</th>
                                {/* <th scope="col">Return time</th> */}
                                <th scope="col">Source</th>
                                <th scope="col">Destination</th>
                                <th></th>
                                <th></th>


                            </tr>
                        </thead>
                        <tbody>
                            {scheduledt.map((scheduledata, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{scheduledata.scheduleInfo.flight_Name}</td>
                                    <td>{scheduledata.Adate}</td>
                                    <td>{scheduledata.Atime}</td>
                                    <td>{scheduledata.Ddate}</td>
                                    <td>{scheduledata.Dtime}</td>
                                    <td>{scheduledata.Rdate}</td>
                                    <td>{scheduledata.source}</td>
                                    <td>{scheduledata.destiny}</td>
                                    <td> <Link to='/updateschedule' state={{ id: scheduledata._id }}><button type="submit">Update</button></Link> </td>
                                    <td> <button type="submit" onClick={() => deleteSchedule(scheduledata._id)}>Delete</button></td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </form>
            </div>
            <Footer />

        </>
    )

}
export default ViewSchedule