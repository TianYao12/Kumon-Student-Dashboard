import "../App.css"
import { useState, useEffect, useRef } from 'react'
import AddCurrentStudent from "./AddCurrentStudent";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

function CurrentStudentsDashboard() {
  const [studentData, setStudentData] = useState<CurrentStudentData[]>([]);
  const [scannedData, setScannedData] = useState<string>("");
  const [studentToDelete, setStudentToDelete] = useState<CurrentStudentData | null>(null);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleDelete = async (studentToDelete: CurrentStudentData | null) => {
    try {
      if (studentToDelete) {
        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/current/delete_current_student`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({qrID: studentToDelete.qrID, subject: studentToDelete.Subject})
        });
        if (!response.ok) throw new Error(JSON.stringify(response));
        toast.success(`${studentToDelete.FirstName} ${studentToDelete.LastName} successfully removed from current students`, {autoClose: 1500})
        setStudentData((studentData) => studentData.filter((student) => !(student.Subject === studentToDelete.Subject && student.qrID === studentToDelete.qrID)));
      } else {
        throw new Error("No student to delete")
      }
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCurrentStudentData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentStudentData();
    }, 60000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (inputRef.current && !deleteOpen && !addOpen) inputRef.current.focus();
    }, 3000);
    return () => clearInterval(interval);
  }, [addOpen, deleteOpen]);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  const calculateTimeDifferenceInMinutes = (isoString: string) => {
    const currentDate = new Date();
    const createdDate = new Date(isoString);

    const differenceInMillis = Number(currentDate) - Number(createdDate);
    const differenceInMinutes = Math.floor(differenceInMillis / 1000 / 60);

    return differenceInMinutes === 1 ? `${differenceInMinutes}` : `${differenceInMinutes}`;
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
              ref={inputRef}
              className="qr-input" 
              type="text" 
              value={scannedData} 
              onChange={handleInputChange}
            />
          </div>
          <div className="refresh-add-container">
            <button 
              onClick={() => fetchCurrentStudentData()}
              className="refresh-add-button"
            >
              Refresh
            </button>
            <button 
              onClick={() => setAddOpen((prev) => !prev)} 
              className="refresh-add-button"
            >
              Add Student
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
              <th>Minutes Passed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData && studentData.map((student, index) => (
              <tr key={`${student}-${index}`} className={Number(calculateTimeDifferenceInMinutes(student.createdAt)) > 30 ? "current-table-row-red-done" : Number(calculateTimeDifferenceInMinutes(student.createdAt)) > 25 ? "current-table-row-red"  : ""}>
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
            handleDelete(studentToDelete);
          }}
          student={studentToDelete}
          deleteType="CURRENT"
        />
      }
    </>
  )
}

export default CurrentStudentsDashboard;
