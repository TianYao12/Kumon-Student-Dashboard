import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  useEffect(() => {
    const fetchStudentData = async() => {
      try {
        // const response = await fetch("/api/getStudents");
        // const data = await response.json();

        //fake data for now
        const data = [
          { id: '1', name: 'John Doe', time_entered: '08:00 AM', time_left: '0:05' },
          { id: '2', name: 'Jane Smith', time_entered: '09:00 AM', time_left: '0:30 ' },
          { id: '3', name: 'Sam Wilson', time_entered: '10:00 AM', time_left: '01:00' },
          { id: '4', name: 'Alice Johnson', time_entered: '11:00 AM', time_left: '0:50 PM' }
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
            <h2 className="grid-column-heading-text">Minutes Left</h2>
          </div>
        </div>
        { studentData.map((student) => {
          return (
            <div className="grid-container">
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

export default App
