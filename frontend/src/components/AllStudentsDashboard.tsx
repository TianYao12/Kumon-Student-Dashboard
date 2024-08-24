import "../App.css"
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import AddStudent from "./AddStudent";
import DeleteModal from "./DeleteModal";

function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [scannedData, setScannedData] = useState<string>("");
  const [deleteBool, setDeleteBool] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<StudentData | null>(null);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const debounceTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const fetchStudentData = async() => {

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
  };

  const handleDelete = async(kumon_id: string) => {
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
            <h2 className="grid-column-heading-text">Student Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Subject</h2>
          </div>
        </div>
        { studentData.map((student, index) => {
          return (
            <div key={`${student}-${index}`} className="grid-container">
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.name}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.subject}</h2>
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
