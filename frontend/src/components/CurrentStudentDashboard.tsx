import "../App.css"
import { useState, useEffect, useRef } from 'react'
import AddCurrentStudent from "./AddCurrentStudent";
import DeleteModal from "./DeleteModal";

function CurrentStudentsDashboard() {
  const [studentData, setStudentData] = useState<CurrentStudentData[]>([]);
  const [scannedData, setScannedData] = useState<string>("");
  const [studentToDelete, setStudentToDelete] = useState<CurrentStudentData | null>(null);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const debounceTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const fetchCurrentStudentData = async() => {
    try {
      const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/current/get_current_students`);
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData(data.students);
    } catch (error) {
        console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setScannedData(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      doScanPOSTRequest(value);
      setScannedData(""); 
    }, 300);
  };

  const doScanPOSTRequest = async(qrID: string) => {
    try {
      const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/current/add_current_student`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({qrID: qrID})
      });
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData([...studentData, data.student]);
    } catch(error) {
      console.error(error);
    }
  };

  const handleDelete = async(qrID: string, subject: 'Math' | 'Reading') => {
    try {
      const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/current/delete_current_student`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({qrID: qrID, subject: subject})
      });
      if (!response.ok) throw new Error(JSON.stringify(response));
      setStudentData((studentData) => studentData.filter((student) => student.Subject !== subject && student.qrID !== qrID))
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCurrentStudentData();
  }, [])

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  const calculateTimeDifferenceInMinutes = (isoString: string) => {
    const currentDate = new Date();
    const createdDate = new Date(isoString);

    const differenceInMillis = Number(currentDate) - Number(createdDate);
    const differenceInMinutes = Math.floor(differenceInMillis / 1000 / 60);

    return differenceInMinutes === 1 ? `${differenceInMinutes}min` : `${differenceInMinutes}mins`;
  };


  return (
    <>
      <div className='main-container'> 
        <h1 className='big-header'>Current Students</h1>
        <div className="add-student-container">
          <div className="scanner-container">
            <h2>
              Scanner
            </h2>
            <input 
              className="qr-input" 
              type="text" 
              value={scannedData} 
              onChange={handleInputChange}
            />
          </div>
          <div className="manual-add-container">
            <button 
              onClick={() => setAddOpen((prev) => !prev)} 
              className="add-student-button"
            >
                Manually Add Student
            </button>
          </div>
        </div>
        <table className="students-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Subject</th>
              <th>Time Entered</th>
              <th>Time Elapsed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData && studentData.map((student, index) => (
              <tr key={`${student}-${index}`}>
                <td>{student.FirstName}</td>
                <td>{student.LastName}</td>
                <td>{student.Subject}</td>
                <td>{formatTime(student.createdAt)}</td>
                <td>{calculateTimeDifferenceInMinutes(student.createdAt)}</td>
                <td>
                  <button 
                    onClick={() => {
                      setDeleteOpen(true); 
                      setStudentToDelete(student)
                    }} 
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      { addOpen && 
        <AddCurrentStudent
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          studentData={studentData} 
          setStudentData={setStudentData}
        /> 
      }
      {
        deleteOpen && 
        <DeleteModal 
          onClose={() => {
            setDeleteOpen(false);
            setStudentToDelete(null);
          }}
          onDelete={() => {
            handleDelete(studentToDelete!.qrID, studentToDelete!.Subject);
          }}
          student={studentToDelete}
          deleteType="CURRENT"
        />
      }
    </>
  )
}

export default CurrentStudentsDashboard;
