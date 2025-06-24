import React, { useState } from "react";
import PollFeed from "./components/PollFeed";
import NewPollModal from "./components/NewPollModal";

const App = () => {
  const [polls, setPolls] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCreatePoll = (newPoll) => {
    setPolls([newPoll, ...polls]);
    setShowModal(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>PollitAGo Lite MVP</h1>
      <button onClick={() => setShowModal(true)} style={styles.newPollBtn}>
        + New Poll
      </button>
      {showModal && (
        <NewPollModal
          onClose={() => setShowModal(false)}
          onCreatePoll={handleCreatePoll}
        />
      )}
      <PollFeed polls={polls} />
    </div>
  );
};

const styles = {
  newPollBtn: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "2rem",
  },
};

export default App;
