import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; 
import { toast } from "react-toastify";

const AddAllStudent = (props: AddAllStudentProps) => {
    const { addOpen, setAddOpen, studentData, setStudentData } = props;

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");

    useEffect(() => {
        if (!addOpen) return;

        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [addOpen]);

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("add-student-modal-overlay")) {
            setAddOpen(false);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/all/add_all_student`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    subject,
                    qrID: uuidv4()
                }),
                credentials: "include"
            });
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    toast.error(data.error);
                }
                throw new Error("Failed to add student");
            } 

            setStudentData([...studentData, data.student]);
            setFirstName("");
            setLastName("");
            setSubject("");
            setAddOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (!addOpen) return null;
    return (
        <div className="add-student-modal-overlay" onClick={handleBackgroundClick}>
            <div className="add-student-modal">
                <p className="close" onClick={() => setAddOpen(false)}>Close</p>
                <form className="form-new-student" onSubmit={handleSubmit}>
                    <div className="add-student-text-input-container">
                        <p className="add-student-input-heading-text">First Name</p>
                        <input
                            type="text"
                            className="new-student-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="add-student-text-input-container">
                        <p className="add-student-input-heading-text">Last Name</p>
                        <input
                            type="text"
                            className="new-student-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="add-student-text-input-container">
                        <p className="add-student-input-heading-text">Subject</p>
                        <select 
                            className="new-student-select" 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a subject</option>
                            <option value="Math">Math</option>
                            <option value="Reading">Reading</option>
                        </select>
                    </div>
                    <button type="submit" className="add-student-submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddAllStudent;