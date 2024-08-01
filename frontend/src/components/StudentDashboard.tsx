import "../App.css"
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from '../firebase/firebase'; 
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [scannedData, setScannedData] = useState<string>("");
  const navigate = useNavigate();

  const debounceTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const handleSignOut = () => {
    auth.signOut();
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


  const handleScan = (data: string) => {
    if (data) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newStudent = {
        id: (studentData.length + 1).toString(),
        name: data,
        time_entered: currentTime,
        time_left: "20"
      };
      setStudentData((prevStudentData) => [...prevStudentData, newStudent]);
      setScannedData(data);
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      if (!user) navigate("/");
    })
    return () => {
      unsubscribe();
    }
  }, [])
  

  useEffect(() => {
    const fetchStudentData = async() => {
      try {
        // const response = await fetch("/api/getStudents");
        // const data = await response.json();

        // fake data for now
        const data = [
          { id: '1', name: 'John Doe', time_entered: '08:00 AM', time_left: '0:05' },
          { id: '2', name: 'Jane Smith', time_entered: '09:00 AM', time_left: '0:30' },
          { id: '3', name: 'Sam Wilson', time_entered: '10:00 AM', time_left: '01:00' },
          { id: '4', name: 'Alice Johnson', time_entered: '11:00 AM', time_left: '0:50' }
        ];
        setStudentData(data);
      } catch(error) {
          console.error(error);
      }
    };
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
            <h2 className="grid-column-heading-text">Student ID</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Student Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Time Entered</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Minutes Left</h2>
          </div>
        </div>
        { studentData.map((student, index) => {
          return (
            <div key={`${student}-${index}`} className="grid-container">
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.id}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.name}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.time_entered}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{student.time_left}</h2>
              </div>
            </div>
        )})}
      </div>
    </>
  )
}

export default StudentDashboard;
