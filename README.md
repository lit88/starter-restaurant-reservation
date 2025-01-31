# Restaurant Reservation System

The Restaurant Reservation System is an application, for managing schedualing for  restaurants staff.
Restaurant workers can track, edit, and cancel reservations, as well as monitor available tables and add new tables as needed.

Deployed version: [Reservation System](https://rest-reservation-lital-client.herokuapp.com)

## Table of Contents

* [Tech Used](#tech-used)
* [Existing files](#existing-files)
* [API](#api)
* [Design](#design)
* [Installation](#installation)
* [Running Tests](#running-tests)

## Tech Used:

### Front-end:
- ReactJS
- JavaScript
- CSS3
- HTML5
- BootStrap

### Back-end:
- Node.js
- Express.js
- PostgreSQL
- Knex

## Existing files

This repository is set up as a *monorepo*, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5001` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |

## API

The API allows for creation, reading, and updating reservations and tables. A user may not make a request to edit a table or delete a table or reservation at this time.

## Design

### Dashboard

Reservations are managed on the dashboard. By default, the dashboard will list reservations for today. Use the `Previous` and `Next` buttons to navigate through the reservations by date.

Tables and their availability are listed below the day's reservations.

![reservation dashboard](/images/dashboard.jpg?raw=true)

### Create New Reservation

Create a reservation by clicking `New Reservation` in the navigation bar:

![create reservation](/images/newRes.jpg?raw=true)

### Edit Reservation

An option to edit an existing reservation. You can reach it by using the `Edit` button of the required reservation. All fields are available for editing with the same restrications of new orders

![edit reservation](/images/editRes.jpg?raw=true)

### Seat Reservation

Clicking the `Seat` button of a reservation, navigates to the seating page. Tables with a capacity smaller than a reservation's party size cannot be selected.

![seat reservation](/images/seatRes.jpg?raw=true)

### Search Reservations

Searching for a reservation by mobile number (full or partial) 

![search reservations](/images/searchRes.jpg?raw=true)

### Add Tables

Users can add additional tables to the system by clicking the `New Table` button in the navigation bar.

![create table](/images/newTable.jpg?raw=true)


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests for the user story you're working on at any given time.

Once you have all user stories complete, you can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.

> **Note**: After running `npm test`, `npm run test:X`, or `npm run test:e2e` you might see something like the following in the output: `[start:frontend] Assertion failed:`. This is not a failure, it is just the frontend project getting shutdown automatically.

> **Note**: If you are getting a `unable to resolve dependency tree` error when running the frontend tests, run the following command: `npm install --force --prefix front-end`. This will allow you to run the frontend tests.

> **Hint**: If you stop the tests before they finish, it can leave the test database in an unusual state causing the tests to fail unexpectedly the next time you run them. If this happens, delete all tables in the test database, including the `knex_*` tables, and try the tests again.

### Frontend test timeout failure

Running the frontend tests on a resource constrained computer may result in timeout failures.

If you believe your implementation is correct, but needs a bit more time to finish, you can update the `testTimeout` value in `front-end/e2e/jest.config.js`. A value of 10000 or even 12000 will give each test a few more seconds to complete.

#### Screenshots

To help you better understand what might be happening during the end-to-end tests, screenshots are taken at various points in the test.

The screenshots are saved in `front-end/.screenshots` and you can review them after running the end-to-end tests.

You can use the screenshots to debug your code by rendering additional information on the screen.