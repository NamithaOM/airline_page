import React from "react";
function AdminHeader(){
    return(
        <>
          <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/admin" style={{ color: 'blue', textShadow: '4px 4px 4px rgb(219, 18, 18)' }}> <strong> AiroSpace</strong></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/features">Features</a>
                              </li>
                            </ul> */}
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                {/* <a href="/signup" className="btn btn-warning" style={{ marginRight: '10px' }}>SignUp</a> */}
                                {/* <a href="/login" className="btn btn-primary" style={{ marginRight: '10px' }}>Login</a> */}
                                <a href="/logout" className="btn btn-warning">Logout</a>

                            </form>
                        </div>
                    </div>
                </nav>
            </div></>
    )

}
export default AdminHeader