import React from "react";

import AdminHeader from "./AdminHeader"
import Footer from './Footer';

function AdminHome(){
    return(

<>
<AdminHeader/>
<div className="adminhome">
<div className="admnsidebr">
<a href="/companyView" style={{TextDecoder:'null'}}>Company</a>
</div>
<div>
<h1>Welcome to AiroSpace </h1>

</div>
</div>
<Footer/>
</>  
  )

}
export default AdminHome