import React from "react";
import "../styles/journalModal.css";

const JournalModal = ({ journal, onClose, onEdit, onDelete }) => {
  return (
    <div className="popup" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Journal Entry - {journal.date}</h2>
        <p><strong>Affirmation:</strong> {journal.affirmation}</p>
        <p><strong>Gratitude:</strong> {journal.gratitude}</p>
        <p><strong>Happiness:</strong> {journal.happiness}</p>
        <p><strong>Improvement:</strong> {journal.improvement}</p>
        <p><strong>Tasks:</strong> {journal.tasks.join(", ")}</p>
        <p><strong>Mood:</strong> {journal.mood}/5</p>
        
      
        <div className="modal-buttons">
          {onEdit && <button className="edit-btn" onClick={() => onEdit(journal)}>Edit</button>}
          {onDelete && <button className="delete-btn" onClick={() => onDelete(journal._id)}>Delete</button>}
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default JournalModal;