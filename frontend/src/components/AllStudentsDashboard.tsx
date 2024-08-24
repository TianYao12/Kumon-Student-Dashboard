import "../App.css"
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import AddStudent from "./AddStudent";
import DeleteModal from "./DeleteModal";

function StudentDashboard() {
  const [studentData, setStudentData] = useState<AllStudentData[]>([]);
  const [scannedData, setScannedData] = useState<string>("");
  const [deleteBool, setDeleteBool] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<AllStudentData | null>(null);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const debounceTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const fetchStudentData = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/all/get_all_students");
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData(data.students);
    } catch (error) {
        console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setScannedData(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleScan(value);
      setScannedData(""); 
    }, 300);
  };


  const handleScan = async(data: string) => {
    if (data) {
      const newStudent = {
        name: "PEPSI",
        kumon_id: data,
        time_entered: new Date().toISOString(),  
      };
      try {
        const response = await fetch(import.meta.env.VITE_FIRESTORE_ADD_CURRENT_STUDENT_ENDPOINT_URL, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newStudent)
      });
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData([...studentData, data.data]);
      } catch(error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async(kumon_id: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_FIRESTORE_DELETE_CURRENT_STUDENT_ENDPOINT_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kumon_id: kumon_id })
      })
      if (!response.ok) throw new Error(JSON.stringify(response));
      fetchStudentData();
    } catch(error) {
        console.error(error)
    }
  }
  

  useEffect(() => {
    fetchStudentData();
  }, [])

  return (
    <>
      <div className='main-container'> 
        <h1>All Students Dashboard</h1>
        <div className="grid-container">
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">First Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Last Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Subject</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">qrId</h2>
          </div>
        </div>
        { studentData.map((student, index) => {
          return (
            <div key={`${student}-${index}`} className="grid-container">
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.FirstName}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.LastName}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.Subject}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.qrID}</h2>
              </div>
              <button 
                onClick={() => {
                  setDeleteBool(true); 
                  setStudentToDelete(student)
                  }} 
                className="delete-button"
              >
                Delete
              </button>
            </div>
        )})}
        <div className="add-student-container">
          <button 
            onClick={() => setAddOpen((prev) => !prev)} 
            className="add-student-button"
          >
              Add Student
          </button>
          { addOpen && 
            <AddStudent 
              addOpen={addOpen} 
              setAddOpen={setAddOpen} 
              studentData={studentData} 
              setStudentData={setStudentData}
            /> 
          }
        </div>
      </div>
      {
        deleteBool && 
        <DeleteModal 
          onClose={() => {
            setDeleteBool(false);
            setStudentToDelete(null);
          }}
          onDelete={() => handleDelete(studentToDelete!.kumon_id)}
          student={studentToDelete}
        />
      }
    </>
  )
}

export default StudentDashboard;
