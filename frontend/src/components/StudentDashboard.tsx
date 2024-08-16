import "../App.css"
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from '../firebase/firebase'; 
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

  const handleSignOut = () => {
    auth.signOut();
  };

  const fetchStudentData = async() => {
    try {
      if (!import.meta.env.VITE_FIRESTORE_GET_CURRENT_STUDENTS_ENDPOINT_URL) throw new Error("No firestore endpoint url!");
      const response = await fetch(import.meta.env.VITE_FIRESTORE_GET_CURRENT_STUDENTS_ENDPOINT_URL);

      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData(data.data);
    } catch(error) {
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
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      if (!user) navigate("/");
    })
    return () => {
      unsubscribe();
    }
  }, [navigate])
  

  useEffect(() => {
    fetchStudentData();
  }, [])

  return (
    <>
      <div className='main-container'> 
        <div className="signout" onClick={handleSignOut}>Sign Out</div>
        <h1>Student Dashboard</h1>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Scan QR code here"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
        <div className="grid-container">
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Student Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Kumon ID</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Time Entered</h2>
          </div>
        </div>
        { studentData.map((student, index) => {
          return (
            <div key={`${student}-${index}`} className="grid-container">
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.name}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.kumon_id}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.time_entered}</h2>
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
