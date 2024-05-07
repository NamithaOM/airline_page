import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar'

function AddPackage() {
    const [flightId, setFlightId] = useState('');
    const [packages, setPackages] = useState('');
    const [special, setSpecial] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [flight, setFlight] = useState([]);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
    const navigate = useNavigate();

    let companyId = authenticated._id;

    const addPackage = (e) => {
        e.preventDefault();
                navigate('/viewpackage');

        const formData = new FormData();
        formData.append('flight', flightId);
        formData.append('pack', packages);
        formData.append('special', special);
        formData.append('price', price);
        formData.append('img', image);
        formData.append('companyId', companyId);

        fetch('http://localhost:5001/addpackage', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetch('http://localhost:5001/viewpackage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId: companyId })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setFlight(result.flightResult);
        })
        .catch(err => console.error(err));
    }, []);

   
    return(
        <>
        <CommonHeader />
        <div className="companybody">
            <CompanySidebar />

            <form method="post" encType="multipart/formdata" onSubmit={addPackage}>
            Flight<select name='flight' value={flightId}className="form-control"
             onChange={(e) => setFlightId(e.target.value)}>
                    <option>Select</option>
                    {flight.map((datas) => (
                        <option  value={datas._id}>
                            {datas.flight_Name}
                        </option>
                    ))}
                </select>
            

                Package<input type="text" name="pack" className="form-control"
                    onChange={(e) => setPackages(e.target.value)}></input>
                     Specialization <input type="text" name="special" className="form-control"
                    onChange={(e) => setSpecial(e.target.value)}></input>
                     Price <input type="text" name="price" className="form-control"
                    onChange={(e) => setPrice(e.target.value)}></input>
                     Image <input type="file" name="img" className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}></input>
                    
                <button type="submit">Submit</button>


            </form>
        </div>


        <Footer />
    </>
    )

}
export default AddPackage


