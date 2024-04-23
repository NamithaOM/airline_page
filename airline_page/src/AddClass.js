import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'


function AddClass() {
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')))
    const [flightclass, setFlightclass] = useState('')
    const navigate = useNavigate();

    const addflights = (e) => {
        e.preventDefault()
        navigate('/viewclass');

        let companyId = authenticated._id

        let flightData = {
            flightclass: flightclass,
            companyID: companyId
        }
        fetch('http://localhost:5001/addclass', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, body: JSON.stringify(flightData)
        }).then((res) => res.json()).then((result) => {
            // console.log(result);
        })

    }

    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />

                <form method="post" onSubmit={addflights}>
                    Class <input type="text" name="flightclass" className="form-control"
                        onChange={(e) => setFlightclass(e.target.value)}></input>
                    <button type="submit">Submit</button>


                </form>
            </div>


            <Footer />
        </>

    )

}


export default AddClass