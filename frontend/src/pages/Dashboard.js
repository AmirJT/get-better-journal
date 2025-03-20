import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOURNALS, DELETE_JOURNAL } from "../services/api";
import JournalModal from "../components/JournalModal";
import AddJournal from "./AddJournal";
import EditJournal from "./EditJournal";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(GET_JOURNALS, { fetchPolicy: "network-only" });
  const [deleteJournal] = useMutation(DELETE_JOURNAL);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [editingJournal, setEditingJournal] = useState(null); 

  useEffect(() => {
    refetch();
  }, [refetch]); 

  const handleJournalAdded = () => {
    refetch();
  };

  const handleDelete = async (journalId) => {
    try {
      await deleteJournal({ variables: { journalId } });
      setSelectedJournal(null);
      refetch(); 
    } catch (err) {
      console.error("Error deleting journal:", err.message);
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setSelectedJournal(null);
  };

  if (loading) return <p>Loading journals...</p>;
  if (error) return <p>Error loading journals.</p>;

  return (
    <div className="dashboard-container">
      <h1>Your Journal Entries</h1>
      
    
      <AddJournal onJournalAdded={handleJournalAdded} />

     
      <div className="journal-grid">
        {data?.getJournals.map((journal) => (
          <div key={journal._id} className="journal-card" onClick={() => setSelectedJournal(journal)}>
            <h3>{journal.date}</h3>
            <p>{journal.affirmation}</p>
          </div>
        ))}
      </div>

   
      {selectedJournal && (
        <JournalModal
          journal={selectedJournal}
          onClose={() => setSelectedJournal(null)}
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {editingJournal && (
        <EditJournal
          journal={editingJournal}
          onClose={() => setEditingJournal(null)}
          onJournalUpdated={refetch}
        />
      )}
    </div>
  );
};

export default Dashboard;