import React, { useEffect, useState } from "react";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'

function CompanyProfile() {
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [companyName, setCompanyName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyPh, setCompanyPh] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')

    useEffect(() => {
        let logid = authenticated._id
        let companyid=authenticated.regId
        console.log({companyid,logid});
        fetch('http://localhost:5001/companyprofile', {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body: JSON.stringify({companyid,logid})
        })
            .then((res) => res.json()).then((result) => {
                console.log(result);
                setCompanyName(result.companydata.companyName)
                setCompanyAddress(result.companydata.companyAddress)
                setCompanyPh(result.companydata.companyPh)
                setCompanyEmail(result.logindata.email)
            })
    }, [])

    return (
        <>

            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />

                <div class="card border-info mb-3" >
  <div class="card-header text-info"><h5>{companyName}</h5></div>
  <div class="card-body ">
    <p class="card-text">Address:{companyAddress}.</p>
    <p class="card-text"> Phone: {companyPh}</p>
    <p class="card-text">Email:{companyEmail}</p>
  </div>
</div>

  </div>
       <Footer />

        </>
    )

}
export default CompanyProfile

