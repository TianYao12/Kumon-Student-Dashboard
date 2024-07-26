import './App.css'
import { useState, useEffect } from 'react'

interface StudentData {
  id: string;
  name: string;
  time_entered: number; // change this later probably
  time_left: number
}

function App() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  useEffect(() => {
    const fetchStudentData = async() => {
      try {
        const response = await fetch("/api/getStudents");
        const data = await response.json();
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
        <h1>Student Dashboard</h1>
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
            <h2 className="grid-column-heading-text">Time Remaining</h2>
          </div>
        </div>
        { studentData.map((student) => {
          return (
            <div className="grid-container">
              <div className="grid-column-heading">
                <h2 className="grid-column-heading-text">{student.id}</h2>
              </div>
              <div className="grid-column-heading">
                <h2 className="grid-column-heading-text">{student.name}</h2>
              </div>
              <div className="grid-column-heading">
                <h2 className="grid-column-heading-text">{student.time_entered}</h2>
              </div>
              <div className="grid-column-heading">
                <h2 className="grid-column-heading-text">{student.time_left}</h2>
              </div>
            </div>
        )})}
      </div>
    </>
  )
}

export default App
