import React from "react";

function ShowTables({tables}) {
    if(tables.length > 0){
    return (
        <div className="row">
          { tables.map((table)=> {
          const {table_name, reservation_id, capacity} = table
            return (
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{table_name}</h5>
                  <p className="card-text">Table Size: {capacity} 
                  <br/>
                  {reservation_id ? "Occupied" : "free"}                  
                  </p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            ) 
            })}
        </div>
    )}
    return null
}

export default ShowTables