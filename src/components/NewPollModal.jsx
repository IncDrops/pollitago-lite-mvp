import React, { useState } from 'react';

const NewPollModal = ({ onClose, onCreatePoll }) => {
  const [mode, setMode] = useState('poll'); // 'poll' or 'opinion'
  const [descriptions, setDescriptions] = useState(['', '', '', '']);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [affiliateLinks, setAffiliateLinks] = useState(['', '', '', '']);
  const [pollDescription, setPollDescription] = useState('');
  const [pledge, setPledge] = useState('');
  const [timer, setTimer] = useState('');

  const handleDescriptionChange = (value, index) => {
    const updated = [...descriptions];
    updated[index] = value;
    setDescriptions(updated);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, mode === 'poll' ? 4 : 2);
    setImages(files);
  };

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleAffiliateLinkChange = (value, index) => {
    const updated = [...affiliateLinks];
    updated[index] = value;
    setAffiliateLinks(updated);
  };

  const handleSubmit = () => {
    console.log('Submitting:', {
      mode,
      descriptions,
      images,
      video,
      affiliateLinks,
      pollDescription,
      pledge,
      timer,
    });
    alert('Poll submitted (mock)');
    onClose();
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2>Create New {mode === 'poll' ? 'Poll' : '2nd Opinion'}</h2>

        <div style={styles.toggleGroup}>
          <button
            onClick={() => setMode('poll')}
            style={mode === 'poll' ? styles.activeToggle : styles.inactiveToggle}
          >
            Poll
          </button>
          <button
            onClick={() => setMode('opinion')}
            style={mode === 'opinion' ? styles.activeToggle : styles.inactiveToggle}
          >
            2nd Opinion
          </button>
        </div>

        <label style={styles.label}>Poll Description (max 500 characters):</label>
        <textarea
          value={pollDescription}
          onChange={(e) => setPollDescription(e.target.value)}
          maxLength={500}
          style={styles.input}
        />

        {descriptions.map((desc, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1} Description (max 150 characters)`}
            value={desc}
            onChange={(e) => handleDescriptionChange(e.target.value, idx)}
            maxLength={150}
            style={styles.input}
          />
        ))}

        <label style={styles.label}>Upload Image(s):</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={styles.input}
        />

        <label style={styles.label}>Upload Video (max 60s):</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          style={styles.input}
        />

        <label style={styles.label}>Affiliate Links:</label>
        {affiliateLinks.map((link, idx) => (
          <input
            key={idx}
            type="url"
            placeholder={`Affiliate Link ${idx + 1}`}
            value={link}
            onChange={(e) => handleAffiliateLinkChange(e.target.value, idx)}
            style={styles.input}
          />
        ))}

        <label style={styles.label}>Pre-Commitment Pledge ($1 minimum):</label>
        <input
          type="number"
          placeholder="$1.00"
          min="1"
          step="0.01"
          value={pledge}
          onChange={(e) => setPledge(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Set Timer (Format: 1-59 minutes, 1-24 hours, or 1-31 days):</label>
        <input
          type="text"
          placeholder="e.g., 3 hours"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.submitButton}>Poll it & Go</button>
        <p style={styles.disclaimer}>Poll responsibly, the ultimate decision still belongs to you.</p>

        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '500px',
    fontFamily: 'sans-serif', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  },
  toggleGroup: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  activeToggle: { padding: '0.5rem 1rem', background: '#000', color: '#fff', borderRadius: '5px' },
  inactiveToggle: { padding: '0.5rem 1rem', background: '#ccc', color: '#000', borderRadius: '5px' },
  input: { display: 'block', width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px' },
  label: { fontWeight: 'bold', marginTop: '1rem' },
  submitButton: { background: '#007bff', color: '#fff', padding: '0.7rem', width: '100%', borderRadius: '5px', border: 'none' },
  disclaimer: { fontSize: '0.9rem', color: '#555', marginTop: '1rem' },
  closeButton: { marginTop: '1rem', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }
};

export default NewPollModal;
