import React from "react";

function ShowReservations(reservations) {
    if(reservations.length > 0){
    return (
        <div>
        { reservations.map((reservation)=>{
            <div>
            <p>Name: {reservation.first_name} {reservation.last_name}</p>
            <p>Reservation size: {reservation.people}</p>
            </div>
        })}
        </div>
    )}
    return null
}

export default ShowReservations