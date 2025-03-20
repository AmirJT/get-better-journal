import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_JOURNAL, GET_JOURNALS } from "../services/api";
import "../styles/addJournal.css";

const AddJournal = ({ onJournalAdded }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    sleepHours: "",
    mood: 3,
    affirmation: "",
    gratitude: "",
    happiness: "",
    improvement: "",
    tasks: ["", "", ""],
  });

  const [addJournal, { loading, error }] = useMutation(ADD_JOURNAL, {
    refetchQueries: [{ query: GET_JOURNALS }], 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "sleepHours" || name === "mood" ? Number(value) : value  
    });
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index] = value;
    setFormData({ ...formData, tasks: updatedTasks });
  };

  const handleMoodSelect = (value) => {
    setFormData({ ...formData, mood: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      sleepHours: Number(formData.sleepHours), 
      mood: Number(formData.mood),
      affirmation: formData.affirmation,
      gratitude: formData.gratitude,
      happiness: formData.happiness,
      improvement: formData.improvement,
      tasks: formData.tasks,
    };
  
    console.log("Submitting journal entry:", formattedData); 
  
    try {
      const response = await addJournal({ variables: formattedData });
      console.log("GraphQL Response:", response); 
      onJournalAdded(); 
    } catch (err) {
      console.error("GraphQL Error:", err);
      if (err.networkError && err.networkError.result && err.networkError.result.errors) {
        console.error("Full GraphQL Error Message:", err.networkError.result.errors[0].message);
      }
    }
  };

  return (
    <div className="add-journal-container">
      <h2>Add a New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
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
                  onClick={() => handleMoodSelect(value)}
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

        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Journal"}</button>
        {error && <p className="error-message">{error.message}</p>}
      </form>
    </div>
  );
};

export default AddJournal;