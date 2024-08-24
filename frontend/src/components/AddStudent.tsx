import React, { useState, useEffect } from "react";

const AddStudent = (props: AddStudentProps) => {
    const { addOpen, setAddOpen, studentData, setStudentData } = props;

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [qrId, setQrId] = useState<string>("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const response = await fetch("http://localhost:5000/api/all/add_all_student", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                subject: subject,
                qrId: qrId
            })
        });
        //TODO: add a conditional to handle response when user already exists in db
        if (!response.ok) throw new Error(JSON.stringify(response)); 
        const data = await response.json();
        setStudentData([...studentData, data.data]);
        setFirstName("");
        setLastName("");
        setSubject("");
        setQrId("");
    }

    return (
        <div className="add-student-overall-container">
            <p className="close" onClick={() => setAddOpen(false)}>Close</p>
            <form className="form-new-student" onSubmit={handleSubmit}>
                <div className="add-student-text-input-container ">
                    <p className="add-student-input-heading-text">First Name</p>
                    <input
                        type="text"
                        className="new-student-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                </div>
                <div className="add-student-text-input-container ">
                    <p className="add-student-input-heading-text">Last Name</p>
                    <input
                        type="text"
                        className="new-student-input"
                        value={qrId}
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                </div>
                <div className="add-student-text-input-container ">
                    <p className="add-student-input-heading-text">Subject</p>
                    <input
                        type="text"
                        className="new-student-input"
                        value={qrId}
                        onChange={(e) => setSubject(e.target.value)} 
                    />
                </div>
                <div className="add-student-text-input-container ">
                    <p className="add-student-input-heading-text">Kumon ID</p>
                    <input
                        type="text"
                        className="new-student-input"
                        value={qrId}
                        onChange={(e) => setQrId(e.target.value)} 
                    />
                </div>
                <button type="submit" className="add-student-submit-button">Submit</button>
            </form>
        </div>
    )
}

export default AddStudent