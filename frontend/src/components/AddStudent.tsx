import React, { useState } from "react";

const AddStudent = (props: AddStudentProps) => {
    const { addOpen, setAddOpen, studentData, setStudentData } = props;

    const [name, setName] = useState<string>("");
    const [kumonId, setKumonId] = useState<string>("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if (!import.meta.env.VITE_FIRESTORE_ADDSTUDENT_ENDPOINT_URL) throw new Error("No firestore env key!");
        const response = await fetch(import.meta.env.VITE_FIRESTORE_ADDSTUDENT_ENDPOINT_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                kumon_id: kumonId,
                name: name, 
                time_entered: new Date().toISOString()
            })
        });
        if (!response.ok) throw new Error(JSON.stringify(response));
        const data = await response.json();
        setStudentData([...studentData, data.data])
        setName("");
        setKumonId("");
    }

    return (
        <div className="add-student-overall-container">
            <p className="close" onClick={() => setAddOpen(false)}>Close</p>
            <form className="form-new-student" onSubmit={handleSubmit}>
                <div className="add-student-text-input-container ">
                    <p className="add-student-input-heading-text">Name</p>
                    <input
                        type="text"
                        className="new-student-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="add-student-text-input-container ">
                    <p className="add-student-input-heading-text">Kumon ID</p>
                    <input
                        type="text"
                        className="new-student-input"
                        value={kumonId}
                        onChange={(e) => setKumonId(e.target.value)} 
                    />
                </div>
                <button type="submit" className="add-student-submit-button">Submit</button>
            </form>
        </div>
    )
}

export default AddStudent