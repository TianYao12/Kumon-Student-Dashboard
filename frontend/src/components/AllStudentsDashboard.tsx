import "../App.css";
import { useState, useEffect, useMemo } from 'react';
import AddAllStudent from "./AddAllStudent";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/all/get_all_students`, { credentials: "include" });
      if (!response.ok) throw new Error(JSON.stringify(response));
      const data = await response.json();
      setStudentData(data.students);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStudentData = async (firstName: string, lastName: string, subject: 'Math' | 'Reading', qrID: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/all/update_all_student`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, subject, qrID }),
        credentials: "include"
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

  const handlePaginationUpdate = (totalStudents: number) => {
    const newTotalPages = Math.ceil(totalStudents / studentsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  const handleDelete = async (qrID: string, subject: 'Math' | 'Reading') => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/all/delete_all_student`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrID, subject }),
        credentials: "include"
      });
      if (!response.ok) throw new Error(JSON.stringify(response));
      setStudentData((prevStudentData) => {
        const newStudentData = prevStudentData.filter((student) => student.Subject !== subject || student.qrID !== qrID);
        handlePaginationUpdate(newStudentData.length);
        return newStudentData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCurrent = async(student: AllStudentData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/current/add_or_delete_current_student`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: student.FirstName,
                lastName: student.LastName,
                subject: student.Subject
            }),
            credentials: "include"
        });
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 409) {
                toast.error(data.error);
            }
            throw new Error("Failed to add student");
        }
        toast.success(`Added ${student.FirstName} ${student.LastName} to Current Students!`, {autoClose: 1500})
  } catch(error) {
    console.error(error);
  }
}

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

  useEffect(() => {
    handlePaginationUpdate(studentData.length);
  }, [studentData]);

  const totalPages = Math.ceil(studentData.length / studentsPerPage);

  const currentStudents = useMemo(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    return studentData.slice(indexOfFirstStudent, indexOfLastStudent);
  }, [studentData, currentPage, studentsPerPage]);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='main-container'>
        <h1 className='big-header'>All Students</h1>
        <div className="add-student-container">
          <button
            onClick={() => setAddOpen((prev) => !prev)}
            className="add-student-button"
          >
            Add Student
          </button>
        </div>
        <div className="table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th className="first-name-column">First Name</th>
                <th className="last-name-column">Last Name</th>
                <th className="subject-column">Subject</th>
                <th className="actions-column">Actions</th>
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
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editStudentData.lastName}
                          onChange={(e) => handleEditChange('lastName', e.target.value)}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <div className="edit-subject-buttons">
                          <button
                            onClick={() => handleEditChange('subject', 'Math')}
                            className={`edit-subject-button ${editStudentData.subject === 'Math' ? 'active' : ''}`}
                          >
                            Math
                          </button>
                          <button
                            onClick={() => handleEditChange('subject', 'Reading')}
                            className={`edit-subject-button ${editStudentData.subject === 'Reading' ? 'active' : ''}`}
                          >
                            Reading
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="edit-action-buttons">
                          <button
                            onClick={() => updateStudentData(editStudentData.firstName, editStudentData.lastName, editStudentData.subject, student.qrID)}
                            className="edit-confirm-button"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setStudentToEdit(null)}
                            className="edit-cancel-button"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="table-p">{student.FirstName}</td>
                      <td className="table-p">{student.LastName}</td>
                      <td className="table-p">{student.Subject}</td>
                      <td>
                        <button
                          onClick={() => handleAddToCurrent(student)}
                          className="action-button edit-button"
                        >
                          + Current
                        </button>
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
        </div>
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
          deleteType="ALL"
        />
      }
    </>
  );
}

export default AllStudentsDashboard;
