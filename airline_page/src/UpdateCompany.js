import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader"
import Footer from './Footer';



function UpdateCompany() {

    const location=useLocation()
        // console.log(location);

    const [companyName, setCompanyName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyPh, setCompanyPh] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        let companyId={
            id:location.state.id}

        fetch('http://localhost:5001/findcompany',{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(companyId)
        }).then((res)=>res.json()).then((result)=>{
            console.log(result);
            setCompanyName(result.company_dt.companyName)
            setCompanyAddress(result.company_dt.companyAddress)
            setCompanyPh(result.company_dt.companyPh)
            setCompanyEmail(result.login_dt.email)
        })
    },[])



    const companyUpdate = (e) => {
        e.preventDefault();
        navigate('/companyview');

        let updateData = {
            id:location.state.id,
            companyNames: companyName,
            companyAddresss: companyAddress,
            companyPhs: companyPh,
            companyEmails: companyEmail,

        }
        fetch('http://localhost:5001/updatecompany', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            }, body: JSON.stringify(updateData)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
        })
    }

    return (
        <>
        <AdminHeader/>

            <div className="companyfm">
                <form onSubmit={companyUpdate} method="post">
                    <h2>Update company Details</h2>
                    Company Name <input type="text" name="companyNames"value={companyName} className="form-control" onChange={(e) => setCompanyName(e.target.value)}></input>
                    Address < textarea name="companyAddresss" className="form-control" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                    Phone no <input type="text" name="companyPhs" className="form-control" value={companyPh} onChange={(e) => setCompanyPh(e.target.value)} />
                    Email id <input type="email" name="companyEmails" className="form-control" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />

                    <button className="btn btn-primary" style={{ marginLeft: "150px" }}>Update</button>

                </form>
            </div>
        <Footer/>
        </>
    )

}
export default UpdateCompany