const knex = require("../db/connection");

function list(){
    return knex("tables").select("*")
    .orderBy("table_name")
}

function read(table_id){
    return knex("tables").select("*")
        .where({table_id: table_id}).first()
}

function create(table){
    return knex("tables").insert(table)
        .returning("*")
        .then((createdRecords)=> createdRecords[0])
}

function update(updatedTable){
    return knex("tables").select("*")
        .where({table_id: updatedTable.table_id})
        .update(updatedTable, "*")
        .then((updatedRecords)=> updatedRecords[0])
}

function finished(doneTable){
    return knex("tables").select("*")
        .where({table_id: doneTable.table_id})
        .update({reservation_id: null}, "*")
        .then((updatedRecords)=> updatedRecords[0])
}

module.exports = {
    create,
    list,
    read,
    update,
    finished,
};