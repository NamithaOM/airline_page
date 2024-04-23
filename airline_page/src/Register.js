import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {

    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [phno, setPhno] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const regform = (e) => {
        e.preventDefault();
        navigate('/home');
        let params = {
            name: name,
            dob: dob,
            address: address,
            phno: phno,
            email: email,
            password: password,
            userStatus: 1
        }
        fetch('http://localhost:5001/register', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'

            },
            body: JSON.stringify(params)
        }
        ).then((res) => res.json()).then((result) => {
            console.log(result);
        })
    }

    return (
        <>
            < div className="regForm">
                <h2>Register</h2>
                <form method="post" onSubmit={regform}>
                    Full name<input type="text" name="name" className="form-control" placeholder="Enter full name" onChange={(e) => setName(e.target.value)}></input>
                    Date of birth<input type="date" name="dob" className="form-control" onChange={(e) => setDob(e.target.value)}></input>
                    Address<textarea name="address" className="form-control" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)}></textarea>
                    Phone number<input type="text" name="phno" className="form-control" placeholder="Enter Mobile no" onChange={(e) => setPhno(e.target.value)}></input>
                    Email<input type="text" name="email" className="form-control" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}></input>
                    Password<input type="password" name="password" className="form-control" placeholder="Atleast 6 character" onChange={(e) => setPassword(e.target.value)}></input>
                    <button >Register</button>
                </form>
            </div>
        </>
    )
}
export default Register