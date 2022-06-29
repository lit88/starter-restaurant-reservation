const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date
  const data = await service.list(date)
  res.json({data})
}

/**
 * Create handler for reservation resources
 */

async function create(req, res, next) {
  const data = await service.create(req.body.data)
  res.status(201).json({data})
}

async function read(req, res, next) {
  const data = res.locals.reservation
  res.json({data})
}

async function update(req,res, next) {
  const {status} = req.body.data
  const {reservation_id} = res.locals.reservation
  const updatedReservation = {
    reservation_id: reservation_id,
    status: status
  }
  const data = await service.update(updatedReservation)
  res.json({data})
}

/** Validations */

const properties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

const hasRequiredProperties = hasProperties(properties)

function validDate(req, res, next){
  const date = req.body.data.reservation_date
  const validDate = /\d{4}-\d{2}-\d{2}/.test(date)
  if (!date || !validDate) {
    next({
          status: 400,
          message: 'reservation_date is not valid',
        })
    }
  next()
}

function validTime(req, res, next){
  const time = req.body.data.reservation_time
  const validTime = /[0-9]{2}:[0-9]{2}/.test(time)
  if (!time || !validTime) {
    next({
      status: 400,
      message: 'reservation_time is not valid',
    })
  }
  next()
}

function validPeople(req, res, next){
  const {people} = req.body.data
  if(!Number.isInteger(people)){
    next({
      status: 400,
      message: `people must be a number`,
    })
  }
  next()
}

function futureRes(req, res, next){
  const resDate = req.body.data.reservation_date
  const resTime = req.body.data.reservation_time
  const date = new Date(`${resDate} ${resTime}`)
  if(new Date() > date){
    next({
      status: 400,
      message: `Reservations must be for future dates`,
    })
  }
  next()
}

function notTuesday(req, res, next) {
  const reservationDate = req.body.data.reservation_date
  const date = new Date(reservationDate)
  const day = date.getDay()
  if(day === 1){
    next({
      status: 400,
      message: `The restaurant is closed on Tuesdays`,
    })
  }
  next()
}

function openHours(req, res, next){
  const resDate = req.body.data.reservation_date
  const resTime = req.body.data.reservation_time
  const date = new Date(`${resDate} ${resTime}`)
  if(date.getHours() < 10 || (date.getHours() === 10 && date.getMinutes() < 30)){
    next({
      status: 400,
      message: `The restaurant opens after 10:30 am`,
    })
  }
  if(date.getHours() > 21 || (date.getHours() === 21 && date.getMinutes() > 30)){
    next({
      status: 400,
      message: `The restaurant closes for orders after 09:30 pm`,
    })
  }
  next()
}

async function reservationExists(req, res, next) {
  const {reservation_id} = req.params
  const reservation = await service.read(reservation_id)
  if(reservation){
      res.locals.reservation = reservation
      return next()
  }
  next({
      status: 404,
      message: `table ${reservation_id} does not exist`,
  })
}

function bookedStatus(req, res, next) {
  const {status} = req.body.data
  if(status !== "booked"){
    next({
      status: 400,
      message: `cannot make reservations for ${status} status`,
    })
  }
  next()
}

function notFinished(req, res, next) {
  const {status} = res.locals.reservation
  if(status !== "booked" && status !== "seated") {
    next({
      status: 400,
      message: `cannot make reservations for finished reservations`,
    })
  }
  next()
}

function validStatus(req, res, next) {
  const {status} = req.body.data
  if(status !== "booked" && status !== "seated" && status !== "finished") {
    next({
      status: 400,
      message: `cannot make reservations for unknown status`,
    })
  }
  next()
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    validDate,
    validTime,
    validPeople,
    notTuesday,
    futureRes,
    openHours,
    bookedStatus,
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  reservationExists: [asyncErrorBoundary(reservationExists)],
  update: [
    asyncErrorBoundary(reservationExists),
    validStatus,
    notFinished,
    asyncErrorBoundary(update)
  ]
};
