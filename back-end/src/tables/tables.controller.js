const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties")
const reservationsService = require("../reservations/reservations.service")

// CURDL functions

async function list(req, res) {
    const data = await service.list()
    res.json({data})
}

function read(req, res, next) {
    const data = res.locals.table
    res.json({data})
}

async function create(req, res, next) {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

async function update(req, res, next){
    const updatedTable = {...req.body.data, table_id: res.locals.table.table_id}
    const data = await service.update(updatedTable)
    res.json({data})
}

async function finished(req, res, next){
    const doneTable = {table_id: res.locals.table.table_id}
    const data = await service.finished(doneTable)
    res.json({data})
}

// Validations

async function tableExists(req, res, next) {
    const {table_id} = req.params
    const table = await service.read(table_id)
    if(table){
        res.locals.table = table
        return next()
    }
    next({
        status: 404,
        message: `table ${table_id} does not exist`,
    })
}

const properties = [
    "table_name",
    "capacity",
]

const hasRequiredProperties = hasProperties(properties)

function validCapacity(req, res, next){
    const {capacity} = req.body.data
    if(!Number.isInteger(capacity)){
        next({
          status: 400,
          message: `capacity must be a number`,
        })
    }
    next()
}

function validName(req, res, next){
    const {table_name} = req.body.data
    if(table_name.length < 2){
        next({
            status: 400,
            message: `table_name must be a larger then 1`,
        })   
    }
    next()
}

async function reservationExists(req, res, next){
    const { reservation_id } = req.body.data
    const reservation = await reservationsService.read(reservation_id)
    if (reservation) {
        res.locals.reservation = reservation
        return next()
    }
    next({
        status: 404,
        message: `Reservation #${reservation_id} not found`,
    })
}

function sufficientCapacity(req, res, next) {
    const {people} = res.locals.reservation
    const {capacity} = res.locals.table
    if(people > capacity){
        next({
            status: 400,
            message: `The table does not have sufficient capacity`,
        })
    }
    next()
}

function occupiedTable(req, res, next){
    const {reservation_id} = res.locals.table
    if(reservation_id){
        next({
            status: 400,
            message: `The table is occupied`,
        })
    }
    next()
}

function unoccupiedTable(req, res, next){
    const {reservation_id} = res.locals.table
    if(!reservation_id){
        next({
            status: 400,
            message: `The table is not occupied`,
        })
    }
    next()
}

function validRequest(req, res, next) {
    const { data } = req.body;
    if (!data) {
      return next({
        status: 400,
        message: `requires request data`,
      });
    }
    if (!data.reservation_id) {
      return next({
        status: 400,
        message: `Requires reservation_id property`,
      });
    }
    next();
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(tableExists), read],
    create: [
        hasRequiredProperties,
        validCapacity,
        validName,
        asyncErrorBoundary(create)
    ],
    update: [
        validRequest,
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(reservationExists),
        sufficientCapacity,
        occupiedTable,
        asyncErrorBoundary(update)
    ],
    finished: [
        asyncErrorBoundary(tableExists),
        unoccupiedTable,
        asyncErrorBoundary(finished)
    ]
  };