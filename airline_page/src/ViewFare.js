import React from "react";
import { Link } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'
function ViewFare(){
    return(
        <>
        <CommonHeader/>
        <div className="companybody">
            <CompanySidebar/>
        <p>Ticket Fair</p>
        <Link to='/addfare'><button className="btn btn-light" type="submit" style={{marginLeft:"1000px"}}>Add fare</button></Link>

        </div>
<Footer/>
        </>
    )

}
export default ViewFare