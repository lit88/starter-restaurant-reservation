import React from "react";

function ShowReservations({reservations}) {
    if(reservations.length > 0){
    return (
        <ol className="list-group list-group-numbered">
          { reservations.map((reservation)=> {
          const {people, first_name, last_name, reservation_id, mobile_number, status} = reservation
            return <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{first_name} {last_name}</div>
              <span>Number of people: {people}</span>
              <br/>
              <span>Mobile Number: {mobile_number}</span>
              <br/>
              <span>{reservation_id}</span>
            </div>
            <a href={`/reservations/${reservation_id}/seat`} className="btn btn-primary mx-3">Seat</a>
          </li>
    })}
        </ol>
    )}
    return <h5>No reservations for the requested date</h5>
}

export default ShowReservations