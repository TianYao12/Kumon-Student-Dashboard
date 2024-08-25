import React, { useEffect } from 'react';

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, student, onDelete, deleteType }) => {
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("delete-modal-overlay")) {
            onClose();
        }
    };

    useEffect(() => {
        if (!student) onClose();
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <div className="delete-modal-overlay" onClick={handleBackgroundClick}>
            <div className="delete-modal">
                <h2>{`Are you sure you want to delete ${student && student.FirstName + " " + student.LastName} from ${deleteType} STUDENTS?`}</h2>
                <div className="delete-modal-buttons">
                    <button className="delete-modal-cancel" onClick={onClose}>Cancel</button>
                    <button className="delete-modal-delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
