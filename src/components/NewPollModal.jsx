import React, { useState } from 'react';

const NewPollModal = ({ onClose }) => {
  const [mode, setMode] = useState('poll'); // 'poll' or 'opinion'
  const [options, setOptions] = useState(['', '']);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [affiliateLinks, setAffiliateLinks] = useState(['', '']);

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
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

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleSubmit = () => {
    // Placeholder submission logic
    console.log('Submitting:', { mode, options, images, video, affiliateLinks });
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

        {mode === 'poll' ? (
          <>
            {options.map((opt, idx) => (
              <input
                key={idx}
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(e.target.value, idx)}
                style={styles.input}
              />
            ))}
            {options.length < 4 && (
              <button onClick={addOption} style={styles.smallButton}>+ Add Option</button>
            )}
          </>
        ) : (
          <p>Upload up to 2 images to describe your situation.</p>
        )}

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

        <label style={styles.label}>Affiliate Link{mode === 'poll' ? 's' : ''}:</label>
        <input
          type="url"
          placeholder="Link 1"
          value={affiliateLinks[0]}
          onChange={(e) => handleAffiliateLinkChange(e.target.value, 0)}
          style={styles.input}
        />
        {mode === 'poll' && (
          <input
            type="url"
            placeholder="Link 2 (optional)"
            value={affiliateLinks[1]}
            onChange={(e) => handleAffiliateLinkChange(e.target.value, 1)}
            style={styles.input}
          />
        )}

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
  smallButton: { marginBottom: '1rem', padding: '0.3rem 0.6rem' },
  submitButton: { background: '#007bff', color: '#fff', padding: '0.7rem', width: '100%', borderRadius: '5px', border: 'none' },
  disclaimer: { fontSize: '0.9rem', color: '#555', marginTop: '1rem' },
  closeButton: { marginTop: '1rem', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }
};

export default NewPollModal;
