const knex = require("../db/connection");

function create(reservation){
    return knex("reservations").insert(reservation)
        .returning("*")
        .then((createdRecords)=> createdRecords[0])
}

function list(date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date,
            status: "booked",
            status: "seated" })
        .orderBy("reservation_date")
        .orderBy("reservation_time")
}

function read(reservation_id){
    return knex("reservations").select("*")
        .where({reservation_id: reservation_id}).first()
}

function update(updatedReservation){
    return knex("reservations").select("*")
    .where({reservation_id: updatedReservation.reservation_id})
    .update({status: updatedReservation.status}, "*")
    .then((updatedRecords)=> updatedRecords[0])
}

module.exports = {
    create,
    list,
    read,
    update,
};