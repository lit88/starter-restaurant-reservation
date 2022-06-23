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
  const now = Date.now()
  const resDate = req.body.data.reservation_date
  const date = new Date(resDate)
  const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  if(now > dateUTC){
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

module.exports = {
  list,
  create: [
    hasRequiredProperties,
    validDate,
    validTime,
    validPeople,
    notTuesday,
    futureRes,
    asyncErrorBoundary(create)
  ],
};
