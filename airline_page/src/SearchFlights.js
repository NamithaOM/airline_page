import React, { useEffect, useState } from "react";

function SearchFlights() {
    const [scheduledt, setScheduledt] = useState([]);

    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem('userdata')));
    const userId = authenticated ? authenticated._id : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/flightsview', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setScheduledt(result);
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Sl.no</th>
                    <th scope="col">Arrival Date</th>
                    <th scope="col">Arrival time</th>
                    <th scope="col">Departure date</th>
                    <th scope="col">Departure time</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Source</th>
                    <th scope="col">Destination</th>
                </tr>
            </thead>
            <tbody>
                {scheduledt.map((flightdata, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{flightdata.Adate}</td>
                        <td>{flightdata.Atime}</td>
                        <td>{flightdata.Ddate}</td>
                        <td>{flightdata.Dtime}</td>
                        <td>{flightdata.Rdate}</td>
                        <td>{flightdata.source}</td>
                        <td>{flightdata.destiny}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SearchFlights;
