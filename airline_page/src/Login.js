import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginForm = (e) => {
        e.preventDefault();
        let params = {
            uname: email,
            upassword: password
        };

        fetch('http://localhost:5001/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((userData) => {
            // console.log(userData);
            if(userData !== 'invalid') {
                localStorage.setItem("userdata", JSON.stringify(userData));
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1000);
            } else {
                console.log("not valid");
            }
            console.log(localStorage);
        });
    }
   
    return(
        <>
            <div className="loginform">
                <h2>Login</h2>
                <form onSubmit={loginForm}>
                    User name<input type="text" name="uname" className="form-control" placeholder="Enter email id" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    Password <input type="password" name="upassword" className="form-control" placeholder="enter password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="/register">can't login </a>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;


