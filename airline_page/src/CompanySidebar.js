import React from "react";
import { Link } from "react-router-dom";

function CompanySidebar() {
    return (
        <div className="flex-shrink-0 p-3" style={{ width: '170px' }}>
            <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <svg className="bi me-2" width="30" height="24"><use xlinkHref="#bootstrap"/></svg>
                <span className="fs-5 fw-semibold">Company</span>
            </Link>
            <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <Link to="/profile" className="btn btn-toggle align-items-center rounded collapsed">
                        Profile
                    </Link>
                </li>
                <li className="mb-1">
                    <Link to="/flightview" className="btn btn-toggle align-items-center rounded collapsed">
                        Flight
                    </Link>
                </li>
                <li className="mb-1">
                    <Link to="/viewclass" className="btn btn-toggle align-items-center rounded collapsed">
                        Class
                    </Link>
                </li>
                <li className="mb-1">
                    <Link to="/viewfair" className="btn btn-toggle align-items-center rounded collapsed">
                        Fare
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CompanySidebar;
