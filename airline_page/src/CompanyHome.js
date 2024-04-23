import React from "react";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'


function CompanyHome(){
    return(
    <>
    <CommonHeader/>
    <div className="companybody">
    <CompanySidebar/>


<h1>Welcome</h1>
    </div>
 

<Footer/>
    </>
        
    )

}
export default CompanyHome