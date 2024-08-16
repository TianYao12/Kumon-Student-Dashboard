import React from "react";
import "../App.css"

const AllStudentsDashboard = () => {
    return (
        <div className='main-container'> 
            <h1>All Students Dashboard</h1>
            <div className="grid-container">
                <div className="grid-column-heading">
                    <h2 className="grid-column-heading-text">Student Name</h2>
                </div>
                <div className="grid-column-heading">
                    <h2 className="grid-column-heading-text">Subject</h2>
                </div>
            </div>
        </div>
    )
}

export default AllStudentsDashboard;
