const knex = require("../db/connection");

function create(reservation){
    return knex("reservations").insert(reservation)
        .returning("*")
        .then((createdRecords)=> createdRecords[0])
}

function list(date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_date")
        .orderBy("reservation_time")
}

function read(reservation_id){
    return knex("reservations").select("*")
        .where({reservation_id: reservation_id}).first()
}

module.exports = {
    create,
    list,
    read,
};