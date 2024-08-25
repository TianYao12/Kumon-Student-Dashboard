import "../App.css";
import { useState, useEffect } from 'react';
import AddAllStudent from "./AddAllStudent";
import DeleteModal from "./DeleteModal";

function AllStudentsDashboard() {
  const [studentData, setStudentData] = useState<AllStudentData[]>([]);
  const [studentToDelete, setStudentToDelete] = useState<AllStudentData | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<AllStudentData | null>(null);
  const [editStudentData, setEditStudentData] = useState<{ firstName: string, lastName: string, subject: 'Math' | 'Reading' }>({ firstName: '', lastName: '', subject: 'Math' });
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 30;

  const fetchAllStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/all/get_all_students`);
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData(data.students);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStudentData = async (firstName: string, lastName: string, subject: 'Math' | 'Reading', qrID: string) => {
    try {
      const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/all/update_all_student`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, subject, qrID })
      });
      if (!response.ok) throw new Error(JSON.stringify(response));
      setStudentData((studentData) =>
        studentData.map((student) =>
          student.qrID === qrID ? { ...student, FirstName: firstName, LastName: lastName, Subject: subject } : student
        )
      );
      setStudentToEdit(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (qrID: string, subject: 'Math' | 'Reading') => {
    try {
      const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/all/delete_all_student`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrID, subject })
      });
      if (!response.ok) throw new Error(JSON.stringify(response));
      setStudentData((studentData) => studentData.filter((student) => student.Subject !== subject && student.qrID !== qrID));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (student: AllStudentData) => {
    setStudentToEdit(student);
    setEditStudentData({ firstName: student.FirstName, lastName: student.LastName, subject: student.Subject });
  };

  const handleEditChange = (field: keyof typeof editStudentData, value: string) => {
    setEditStudentData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchAllStudentData();
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentData.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(studentData.length / studentsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='main-container'>
        <h1 className='students-header'>All Students</h1>
        <div className="add-student-container">
          <button
            onClick={() => setAddOpen((prev) => !prev)}
            className="add-student-button"
          >
            Add Student
          </button>
        </div>
        <table className="students-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={`${student.qrID}-${index}`}>
                {studentToEdit?.qrID === student.qrID ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editStudentData.firstName}
                        onChange={(e) => handleEditChange('firstName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editStudentData.lastName}
                        onChange={(e) => handleEditChange('lastName', e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditChange('subject', 'Math')}
                        className={editStudentData.subject === 'Math' ? 'subject-button active' : 'subject-button'}
                      >
                        Math
                      </button>
                      <button
                        onClick={() => handleEditChange('subject', 'Reading')}
                        className={editStudentData.subject === 'Reading' ? 'subject-button active' : 'subject-button'}
                      >
                        Reading
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => updateStudentData(editStudentData.firstName, editStudentData.lastName, editStudentData.subject, student.qrID)}
                        className="confirm-edit-button"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setStudentToEdit(null)}
                        className="delete-button"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.FirstName}</td>
                    <td>{student.LastName}</td>
                    <td>{student.Subject}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(student)}
                        className="action-button edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteOpen(true);
                          setStudentToDelete(student);
                        }}
                        className="action-button del-button"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
      {addOpen &&
        <AddAllStudent
          addOpen={addOpen}
          setAddOpen={setAddOpen}
          studentData={studentData}
          setStudentData={setStudentData}
        />
      }
      {deleteOpen &&
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
  );
}

export default AllStudentsDashboard;
