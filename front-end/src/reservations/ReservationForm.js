import React from "react";
import { Link } from "react-router-dom"

function ReservationForm({submitHandle, changeHandle, form, cancelLink}){
    return (
        <form onSubmit={submitHandle}>
            <div>
                <label htmlFor="first_name" class="form-label">First Name</label>
                <br />
                <input
                    id="first_name"
                    class="form-control"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    onChange={changeHandle}
                    value={form.first_name}
                    required
                    />
            </div>
            <div>
                <label htmlFor="last_name" class="form-label">Last Name</label>
                <br />
                <input
                    id="last_name"
                    class="form-control"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={changeHandle}
                    value={form.last_name}
                    required
                    />
            </div>
            <div>
                <label htmlFor="mobile_number" class="form-label">Mobile Number</label>
                <br />
                <input
                    id="mobile_number"
                    class="form-control"
                    type="tel"
                    placeholder="(---) --- ----"
                    name="mobile_number"
                    onChange={changeHandle}
                    value={form.mobile_number}
                    required
                    />
            </div>
            <div>
                <label htmlFor="reservation_date" class="form-label">Reservation Date</label>
                <br />
                <input
                    id="reservation_date"
                    class="form-control"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="YYYY-MM-DD"
                    name="reservation_date"
                    onChange={changeHandle}
                    value={form.reservation_date}
                    required
                    />
            </div>
            <div>
                <label htmlFor="reservation_time" class="form-label">Reservation Time</label>
                <br />
                <input
                    id="reservation_time"
                    class="form-control"
                    type="time"
                    pattern="[0-9]{2}:[0-9]{2}"
                    placeholder="HH:MM"
                    name="reservation_time"
                    onChange={changeHandle}
                    value={form.reservation_time}
                    required
                    />
            </div>
            <div>
                <label htmlFor="people" class="form-label">Number of people</label>
                <br />
                <input
                    id="people"
                    class="form-control"
                    type="number"
                    min={1}
                    placeholder={1}
                    name="people"
                    onChange={changeHandle}
                    value={form.people}
                    required
                    />
            </div>
            <Link to={cancelLink} className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary m-3">Submit</button>
        </form>
    )
}

export default ReservationForm