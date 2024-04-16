import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader"


function CompanyView() {
    const [companydatas, setCompanydatas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/companyView')
            .then((res) => res.json())
            .then((result) => {
                setCompanydatas(result.logindatas);
            });
    }, []);

    const deleteCompany = (ids) => {
        let param = { id: ids };
    
        fetch('http://localhost:5001/deleteCompany', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            console.log("Deleted");
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    

    return (
        <>
        <AdminHeader/>

            <div className="companyview">

            <div className="admnsidebr">
<a href="/companyView" style={{TextDecoder:'null'}}>Company</a>
</div>
                <div className="tableCompany">
                    <a href="/addcompany"><button>Add Company</button></a>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Address</th>
                                    <th>Phone no</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {companydatas.map((dt) => (
                                    <tr >
                                        <td>{dt.newdata?.companyName}</td>
                                        <td>{dt.newdata?.companyAddress}</td>
                                        <td>{dt.newdata?.companyPh}</td>
                                        <td>{dt.email}</td>
                                        <td>
                                            <button type="button" onClick={() => deleteCompany(dt._id)}>Delete</button>
                {/* <Link to='/updateCompany' state={{ id: dt._id }}><button type="button">Update</button></Link>  */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyView;
