import React, { useState } from 'react';
import NewPollModal from './components/NewPollModal';
import PollFeed from './components/PollFeed';

const App = () => {
  const [showNewPoll, setShowNewPoll] = useState(false);
  const [polls, setPolls] = useState([]); // Feed state

  const handleCreatePoll = (pollData) => {
    setPolls([pollData, ...polls]); // Add new poll to top
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>PollitAGo Lite MVP (Clean Build)</h1>
      <p>This version is Git-free and deploy-ready!</p>

      <button onClick={() => setShowNewPoll(true)} style={{
        padding: '0.7rem 1.2rem',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        + New Poll
      </button>

      {showNewPoll && (
        <NewPollModal
          onClose={() => setShowNewPoll(false)}
          onCreatePoll={handleCreatePoll}
        />
      )}

      <PollFeed polls={polls} />
    </div>
  );
};

export default App;
