import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader"
import Footer from './Footer';



function AddCompany() {
    const [companyName, setCompanyName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyPh, setCompanyPh] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyPassword, setCompanyPassword] = useState('')
    const navigate = useNavigate();

    const companyData = (e) => {
        e.preventDefault();
        navigate('/companyview');

        let companyDt = {
            companyName: companyName,
            companyAddress: companyAddress,
            companyPh: companyPh,
            companyEmail: companyEmail,
            companyPassword: companyPassword,
            userStatus:2

        }
        fetch('http://localhost:5001/addcompany', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            }, body: JSON.stringify(companyDt)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
        })
    }

    return (
        <>
        <AdminHeader/>

            <div className="companyfm">
                <form onSubmit={companyData} method="post">
                    Company Name <input type="text" name="companyName" className="form-control" onChange={(e) => setCompanyName(e.target.value)}></input>
                    Address < textarea name="companyAddress" className="form-control" onChange={(e) => setCompanyAddress(e.target.value)} />
                    Phone no <input type="text" name="companyPh" className="form-control" onChange={(e) => setCompanyPh(e.target.value)} />
                    Email id <input type="email" name="companyEmail" className="form-control" onChange={(e) => setCompanyEmail(e.target.value)} />
                    Password <input type="Password" name="companyPassword" className="form-control" onChange={(e) => setCompanyPassword(e.target.value)} />

                    <button>Submit</button>

                </form>
            </div>
        <Footer/>
        </>
    )

}
export default AddCompany