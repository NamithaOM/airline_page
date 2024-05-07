import React,{useState} from "react";
import { useNavigate} from "react-router-dom";

import './airlineStyle.css'
function AirlineHome() {
  const[source,setSource]=useState('')
  const[destiny,setDestiny]=useState('')
  const navigate = useNavigate();

  const flightSearch = (e) => {
      e.preventDefault();
      navigate('/serchflights')
      let params = {
        source: source,
        destiny: destiny
      };

      fetch('http://localhost:5001/flightsview', {
          method: 'post',
          headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
          },
          body: JSON.stringify(params)
      })
      .then((res) => res.json()).then((result)=>{
        console.log(result);
      })
    }

    return (
        <>
        <div>
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/admin" style={{ color: 'blue', textShadow: '4px 4px 4px rgb(219, 18, 18)' }}> <strong> AiroSpace</strong></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/features">Features</a>
                              </li>
                              <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/userHeader">User Header</a>
                              </li>
                              
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                {/* <a href="/signup" className="btn btn-warning" style={{ marginRight: '10px' }}>SignUp</a> */}
                                <a href="/" className="btn btn-primary" style={{ marginRight: '10px' }}>Logout</a>
                                {/* <a href="/logout" className="btn btn-warning">Logout</a> */}

                            </form>
                        </div>
                    </div>
                </nav>
            </div>

            

<div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="2000">
      <img src="./images/Bali_HP.png" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="./images/Saudi__HP.webp" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="./images/Bali_HP.png" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div class="row mb-3" style={{border:"solid gray"}}>
<form method="post" onSubmit={flightSearch}>
                  Source <input type="text" name="source" className="form-control"  
                        onChange={(e) => setSource(e.target.value)}
                    />
                    Destination <input type="text" name="destiny" className="form-control" 
                        onChange={(e) => setDestiny(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
</div>

          <div class="row mb-3" style={{border:"solid gray"}}>
      <div class="col-4 themed-grid-col"><img src="./images/airline1.jpg" alt=""></img>
</div>
      <div class="col-8 themed-grid-col"> <p><h3>Our services</h3><br/>ahdsvwebvwfgvrggggreufyvrhbrfgyweeegxdsbv <br/>
        vxcbacsgddtewqwyqghwdgewqjhdgjwqhfrrrrf4egywudhwqsjkwqomkzkwqbhdghetrfrfrfe
        <br></br>wygdbuwedhuwqihsiwqueoqwjhdsbwdhgevdwfcgswdrqdtqfsyqwue9piwroekrwndmjksnzbascwfs
        <br></br>defdteywgfuierwhfiknrjfb</p></div>
     
    </div>   


            <div class="footer">
                
        <div>
        <table>
            <tr>
            <td> <b>ABOUT</b> </td>
            <td> <b>HELP</b></td>
            <td><b>CONSUMER POLICY </b></td>
            <td> <b>SOCIAL</b></td>
            </tr>
            <tr>
                <td>Contact Us</td>
                <td>Payments</td>
                <td>Cancellation & returns</td>
                <td> Facebook</td>
            </tr>
            <tr>
                <td> About Us</td>
                <td>Shipping</td>
                <td>terms of Use</td>
                <td> Twitter</td>
            </tr>
            <tr>
                <td>Careers</td>
                <td>Cancellation & Returns</td>
                <td>Security</td>
                <td>YouTube</td>
            </tr>
               <tr>
 
                <td style={{visibility: "hidden"}}> ...................................................</td>
                <td style={{visibility: "hidden"}}> ...................................................</td>
                <td style={{visibility: "hidden"}}> ...................................................</td>
                <td style={{visibility: "hidden"}}> ...................................................</td>

                {/* <td style="visibility: hidden;"> ....................................................</td>
                <td style="visibility: hidden;"> ....................................................</td>
                <td style="visibility: hidden;"> ....................................................</td> */}

            </tr>
            </table>
            </div>
            <div class="ep1">
            <div class="email">
              <p> <b>Mail us:</b> AiroSpace Internet Private Limited, Building alyssa, begonia& clove embassy tech village outer ring road, devarabeesanahalli village,Bengaluru, 569703 </p>
              
              </div>
              <div class="ph1"> 
                <p> <b> contact</b> <br/> Telephone:044-45604700</p>
              </div>
              </div>
            </div>
            
       
            </div>

        </>
    );
}

export default AirlineHome;
