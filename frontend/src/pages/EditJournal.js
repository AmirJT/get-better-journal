import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_JOURNAL, GET_JOURNALS } from "../services/api";
import "../styles/editJournal.css";

const EditJournal = ({ journal, onClose, onJournalUpdated }) => {
  const [formData, setFormData] = useState({
    sleepHours: journal?.sleepHours || "", 
    mood: journal?.mood || 3, 
    affirmation: journal?.affirmation || "",
    gratitude: journal?.gratitude || "",
    happiness: journal?.happiness || "",
    improvement: journal?.improvement || "",
    tasks: journal?.tasks?.length ? journal.tasks : ["", "", ""], 
  });

  const [editJournal, { loading, error }] = useMutation(EDIT_JOURNAL, {
    refetchQueries: [{ query: GET_JOURNALS }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index] = value;
    setFormData({ ...formData, tasks: updatedTasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      journalId: journal._id,
      sleepHours: Number(formData.sleepHours), 
      mood: Number(formData.mood), 
      affirmation: formData.affirmation,
      gratitude: formData.gratitude,
      happiness: formData.happiness,
      improvement: formData.improvement,
      tasks: formData.tasks,
    };
  
    console.log("Submitting edit request:", formattedData); 
  
    try {
      const response = await editJournal({ variables: formattedData });
      console.log("GraphQL Response:", response); 
      onJournalUpdated(); 
      onClose(); 
    } catch (err) {
      console.error("GraphQL Error:", err);
  
    
      if (err.networkError && err.networkError.result && err.networkError.result.errors) {
        console.error("Full GraphQL Error Message:", err.networkError.result.errors[0].message);
      }
    }
  };

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup-content edit-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Journal Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label>Sleep Hours:</label>
              <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Mood:</label>
              <div className="mood-selector">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`mood-circle ${formData.mood >= value ? "selected" : ""}`}
                    onClick={() => setFormData({ ...formData, mood: value })}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Affirmation:</label>
              <input type="text" name="affirmation" value={formData.affirmation} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Gratitude:</label>
              <textarea name="gratitude" value={formData.gratitude} onChange={handleChange} required />
            </div>
          </div>

          <div className="centered-group">
            <label>Top 3 Tasks for Today:</label>
            {formData.tasks.map((task, index) => (
              <input
                key={index}
                type="text"
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                placeholder={`Task ${index + 1}`}
                required
              />
            ))}
          </div>

          <div className="row">
            <div className="input-group">
              <label>What could I have done better?</label>
              <textarea name="improvement" value={formData.improvement} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>What made me happy today?</label>
              <textarea name="happiness" value={formData.happiness} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Journal"}</button>
          {error && <p className="error-message">{error.message}</p>}
        </form>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditJournal;