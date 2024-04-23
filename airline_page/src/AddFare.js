import React, { useEffect, useState } from "react";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
function AddFare(){
    const [fares,SetFares]=useState('')
    const [flight,setFlight]=useState([])
    const [flightClass,setFlightClass]=useState([])
    const [flightId,setFlightId]=useState('')
    const[classId,setClassId]=useState('')
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))

    const addfare=(e)=>{
        let companyId = authenticated._id

        e.preventDefault()
        // let params={
        //     fares:fares, 
        //     flight:flightId,
        //     // flightClass:flightClass,
        //     companyID: companyId

        // }
        // fetch('http://localhost:5001/Addfare', {
        //     method:'post',
        //     headers:{
        //         Accept:'application/json',
        //         'Content-type':'application/json'
        //     },body:JSON.stringify(params)
        // }).then((res)=>res.json()).then((result)=>{
        //     console.log(result);
        // })
    }

   
    
        useEffect(() => {
            const fetchData = async () => {
                
                    const companyId = authenticated._id; 
                    const response = await fetch('http://localhost:5001/viewfare', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ companyId: companyId })
                    }).then((res)=>res.json()).then((result)=>{
                        console.log(result);
                        setFlight(result.flightResult);
                        setFlightClass(result.classResult)

                    })
                
            };
    
            fetchData();
        }, []);
    
    
    

    return(
        <>
        <CommonHeader />
        <div className="companybody">
            <CompanySidebar />

            <form method="post" onSubmit={addfare}>
            Flight<select name='flights' value={flightId} onChange={(e) => setFlightId(e.target.value)}>
                    <option>Select</option>
                    {flight.map((datas) => (
                        <option  value={datas._id}>
                            {datas.flight_Name}
                        </option>
                    ))}
                </select>
                
               Class <select name='classes' value={classId} onChange={(e) => setClassId(e.target.value)}>
                    <option>Select</option>
                    {flightClass.map((dt) => (
                        <option  value={dt._id}>
                            {dt.flight_class}
                        </option>
                    ))}
                </select>

                Fare <input type="text" name="fares" className="form-control"
                    onChange={(e) => SetFares(e.target.value)}></input>
                <button type="submit">Submit</button>


            </form>
        </div>


        <Footer />
    </>
    )

}
export default AddFare


