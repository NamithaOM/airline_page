import React, { useEffect, useState } from "react";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
import { Link, useNavigate } from "react-router-dom";

function ViewPackage(){
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [packagedt, setPackagedt] = useState([])
    const[flightdt,setFlightdt]=useState([])
    let companyId = authenticated._id
    const navigate = useNavigate();
    console.log(companyId);

    useEffect(() => {
        fetch('http://localhost:5001/viewpackage', {
            method: 'POST',
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId })
        }).then((res) => res.json()).then((result) => {
            // console.log(result);
            // setFlightdt(result.flightResult)
            setPackagedt(result.packageResult)

        })
    }, [])

       
    const deletepackage=(iD)=>{

        let delId={
            id:iD
        }
        // console.log(delId);
        fetch('http://localhost:5001/deletepackage', {
            method:'post',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(delId)
        }).then((res)=>res.json()).then((result)=>{
            // console.log(result);
        })
        navigate('/viewpackage');


    }

    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <form method="post">
                    <Link to='/addpackage'><button className="btn btn-light" type="submit" style={{marginLeft:"1000px"}}>Add Package</button></Link>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sl.no</th>
                                <th scope="col">Flight</th>
                                <th scope="col">Package</th>
                                <th scope="col">Specialization</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {packagedt.map((packData,index) => (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{packData.newpackdata.flight_Name}</td>
                                <td>{packData.packages}</td>
                                <td>{packData.special}</td>
                                <td>{packData.price}</td>
                                <td><img src={`http://localhost:5001/images/${packData.image}`} alt="" style={{height:"150px",width:"150px"}}/></td>
                             <td>   <Link to='/updatepackage' state={{ id:packData._id }}><button type="submit">Update</button></Link> </td>
                              <td> <button type="submit" onClick={()=>deletepackage(packData._id)}>Delete</button></td>

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
export default ViewPackage
