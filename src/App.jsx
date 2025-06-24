import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PollFeed from "./components/PollFeed";
import NewPollModal from "./components/NewPollModal";
import PollDetailView from "./components/PollDetailView";
import SecondOpinionDetailView from "./components/SecondOpinionDetailView";

const App = () => {
  const [polls, setPolls] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCreatePoll = (newPoll) => {
    setPolls([newPoll, ...polls]);
  };

  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <button onClick={() => setShowModal(true)}>+ New Poll</button>
        {showModal && (
          <NewPollModal onClose={() => setShowModal(false)} onCreatePoll={handleCreatePoll} />
        )}
        <Routes>
          <Route path="/" element={<PollFeed polls={polls} />} />
          <Route path="/poll/:id" element={<PollDetailView polls={polls} />} />
          <Route path="/opinion/:id" element={<SecondOpinionDetailView polls={polls} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
