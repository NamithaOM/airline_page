import React, { useEffect, useState } from "react";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
import { Link } from "react-router-dom";


function ViewClass() {
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [classdt, setClassdt] = useState([])
    let companyId = authenticated._id
    console.log(companyId);
    useEffect(() => {
        fetch('http://localhost:5001/viewclass', {
            method: 'POST',
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId })
        }).then((res) => res.json()).then((result) => {
            // console.log(result);

            setClassdt(result)

        })
    }, [])

    const deleteclass=(iD)=>{
        let delId={
            id:iD
        }
        // console.log(delId);
        fetch('http://localhost:5001/deleteclass', {
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

    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />
                <form method="post">
                    <Link to='/addclass'><button className="btn btn-light" type="submit" style={{marginLeft:"1000px"}}>Add Class</button></Link>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sl.no</th>
                                <th scope="col">Classes</th>
                                <th scope="col">Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {classdt.map((clsdt,index) => (
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{clsdt.flight_class}</td>
                             <td>   <Link to='/updateclass' state={{ id:clsdt._id }}><button type="submit">Update</button></Link> </td>
                              <td> <button type="submit" onClick={()=>deleteclass(clsdt._id)}>Delete</button></td>

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
export default ViewClass