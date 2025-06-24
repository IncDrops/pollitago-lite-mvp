import React, { useState } from 'react';
import PollFeed from './components/PollFeed';
import NewPollModal from './components/NewPollModal';
import PollDetailView from './components/PollDetailView'; // <- this is the new one

const App = () => {
  const [polls, setPolls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);

  return (
  <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    <h1>PollitAGo Lite MVP</h1>

    <button
      onClick={() => setShowModal(true)}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Create New Poll
    </button>

    <PollFeed
      polls={polls}
      onSelectPoll={(poll) => setSelectedPoll(poll)}
    />

    {showModal && (
      <NewPollModal
        onClose={() => setShowModal(false)}
        onCreatePoll={(poll) => {
          setPolls([poll, ...polls]);
          setShowModal(false);
        }}
      />
    )}

    {selectedPoll && (
      <PollDetailView
        poll={selectedPoll}
        onClose={() => setSelectedPoll(null)}
      />
    )}
    </div>
  );
};

export default App;
