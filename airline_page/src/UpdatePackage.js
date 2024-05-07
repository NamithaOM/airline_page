import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommonHeader from './CommonHeader';
import Footer from './Footer';
import CompanySidebar from './CompanySidebar';

function UpdatePackage() {
    const location = useLocation();
    const [flightId, setFlightId] = useState('');
    const [packages, setPackages] = useState('');
    const [special, setSpecial] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [flight, setFlight] = useState([]);
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const packid = location.state.id;
        const formData = new FormData();
        formData.append('packId', packid);
        
        fetch('http://localhost:5001/findpackage', {
            method: 'post',
            body: formData
        })
        .then((res) => res.json())
        .then((result) => {
            setPackages(result.packages);
            setSpecial(result.special);
            setPrice(result.price);
            setImage(result.image);

            setImagePreview(`http://localhost:5001/images/${result.image}`);
        });
    }, [location.state.id]);

    const updatePackage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('packId', location.state.id);
        formData.append('flight', flightId);
        formData.append('pack', packages);
        formData.append('special', special);
        formData.append('price', price);
        formData.append('img', image);

        fetch('http://localhost:5001/updatepackage', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            navigate('/viewpackage');
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <CommonHeader />
            <div className="companybody">
                <CompanySidebar />

                <form method="post" encType="multipart/form-data" onSubmit={updatePackage}>
                    Flight
                    <select name='flights' value={flightId} className="form-control" onChange={(e) => setFlightId(e.target.value)}>
                        <option>Select</option>
                        {flight.map((datas) => (
                            <option value={datas._id}>
                                {datas.flight_Name}
                            </option>
                        ))}
                    </select>
                    Package
                    <input type="text" name="packs" className="form-control" value={packages} onChange={(e) => setPackages(e.target.value)} />
                    Specialization
                    <input type="text" name="specials" className="form-control" value={special} onChange={(e) => setSpecial(e.target.value)} />
                    Price
                    <input type="text" name="prices" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                    Image
                    <input type="file" name="imgs" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
export default UpdatePackage;
