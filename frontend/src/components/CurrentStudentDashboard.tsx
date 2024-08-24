import "../App.css"
import { useState, useEffect, useRef } from 'react'
import AddCurrentStudent from "./AddAllStudent";
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
      const response = await fetch("http://localhost:5000/api/current/get_current_students");
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData(data.students);
      console.log(studentData)
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
  };

  const handleDelete = async(qrID: string, subject: 'Math' | 'Reading') => {
    try {
      const response = await fetch("http://localhost:5000/api/current/delete_current_student", {
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
        <h1>Current Students</h1>
        <div className="add-student-container">
          <button 
            onClick={() => setAddOpen((prev) => !prev)} 
            className="add-student-button"
          >
              Add Student
          </button>
        </div>
        <div className="grid-container-current">
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text first-name-heading">First Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Last Name</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Subject</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Time entered</h2>
          </div>
          <div className="grid-column-heading">
            <h2 className="grid-column-heading-text">Time remaining</h2>
          </div>
        </div>
        { studentData && studentData.map((student, index) => (
            <div key={`${student}-${index}`} className="grid-container-current">
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
                <h2 className="grid-column-normal-text">{formatTime(student.createdAt)}</h2>
              </div>
              <div className="grid-column-normal">
                <h2 className="grid-column-normal-text">{calculateTimeDifferenceInMinutes(student.createdAt)}</h2>
              </div>
              <button 
                onClick={() => {
                  setDeleteOpen(true); 
                  setStudentToDelete(student)
                  }} 
                className="delete-button"
              >
                Delete
              </button>
            </div>
        ))}
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
        />
      }
    </>
  )
}

export default CurrentStudentsDashboard;
