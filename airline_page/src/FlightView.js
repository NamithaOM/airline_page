import React, { useEffect, useState } from "react";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
import { Link } from "react-router-dom";


function FlightView() {
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [flightdt, setFlightdt] = useState([])
    let companyId = authenticated._id
    console.log(companyId);
    useEffect(() => {
        fetch('http://localhost:5001/companyflight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId })
        }).then((res) => res.json()).then((result) => {
            console.log(result);

            setFlightdt(result)

        })
    }, [])

    const deleteFlight=(iD)=>{
        let delId={
            id:iD
        }
        // console.log(delId);
        fetch('http://localhost:5001/deleteFlight', {
            method:'post',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(delId)
        }).then((res)=>res.json()).then((result)=>{
            console.log(result);
        })

    }

    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <form>
                    <Link to='/addflight'><button className="btn btn-light" type="submit" style={{marginLeft:"1000px"}}>Add Flight</button></Link>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sl.no</th>
                                <th scope="col">Flight name</th>
                                <th scope="col">No of seats</th>
                                <th scope="col">Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {flightdt.map((flightdt,index) => (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{flightdt.flight_Name}</td>
                                <td>{flightdt.seats}</td>
                              <td>  <Link to='/updateflight' state={{ id:flightdt._id }}><button type="submit">Update</button></Link> </td>
                               <td> <button type="submit" onClick={()=>deleteFlight(flightdt._id)}>Delete</button></td>

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
export default FlightView