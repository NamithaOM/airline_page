import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'

function ViewFare(){

        const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
        const [faredt, setFaredt] = useState([])
        let companyId = authenticated._id
        const navigate = useNavigate();
        console.log(companyId);

        useEffect(() => {
            fetch('http://localhost:5001/viewfare', {
                method: 'POST',
                headers: {
                    Accept:"application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ companyId })
            }).then((res) => res.json()).then((result) => {
                // console.log(result);
    
                setFaredt(result.fareResult)
    
            })
        }, [])
        
    const deletefare=(iD)=>{
        navigate('/viewfare');

        let delId={
            id:iD
        }
        // console.log(delId);
        fetch('http://localhost:5001/deletefare', {
            method:'post',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(delId)
        }).then((res)=>res.json()).then((result)=>{
            // console.log(result);
        })

    }

    return(
        <>
         <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <form method="post">
                <Link to='/addfare'><button className="btn btn-light" type="submit" style={{marginLeft:"1000px"}}>Add fare</button></Link>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sl.no</th>
                                <th scope="col">Flight</th>
                                <th scope="col">Class</th>
                                <th scope="col">Fare</th>
                                <th scope="col">Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {faredt.map((faredata,index) => (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{faredata.flightInfo.flight_Name}</td>
                                <td>{faredata.classInfo.flight_class}</td>
                                <td>{faredata.fare}</td>


                             <td>   <Link to='/updatefare' state={{ id:faredata._id }}><button type="submit">Update</button></Link> </td> 
                               <td> <button type="submit" onClick={()=>deletefare(faredata._id)}>Delete</button></td>

                            </tr>
                        ))}
                           
                        </tbody>
                    </table>
                </form>
            </div>
<Footer/>
  
        </>
    )

}
export default ViewFare