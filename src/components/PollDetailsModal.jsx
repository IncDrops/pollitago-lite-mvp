import React from 'react';

const PollDetailsModal = ({ poll, onClose }) => {
  if (!poll) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'} Details</h2>

        <p><strong>Description:</strong> {poll.pollDescription}</p>

        <ul>
          {poll.options.map((opt, idx) => (
            <li key={idx}><strong>Option {idx + 1}:</strong> {opt}</li>
          ))}
        </ul>

        {poll.images && poll.images.map((img, idx) => (
          <img key={idx} src={URL.createObjectURL(img)} alt={`Option ${idx + 1}`} style={styles.image} />
        ))}

        {poll.video && (
          <video controls style={styles.video}>
            <source src={URL.createObjectURL(poll.video)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {poll.affiliateLinks?.map((link, i) => (
          link && (
            <p key={i} style={{ fontSize: '0.9rem' }}>
              <strong>Affiliate Link {i + 1}:</strong> <a href={link} target="_blank" rel="noreferrer">{link}</a>
            </p>
          )
        ))}

        {poll.pledgeAmount && (
          <p><strong>Pledge:</strong> ${poll.pledgeAmount.toFixed(2)}</p>
        )}

        {poll.expiresAt && (
          <p><strong>Expires At:</strong> {new Date(poll.expiresAt).toLocaleString()}</p>
        )}

        <button onClick={onClose} style={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
  },
  modal: {
    background: '#fff', padding: '2rem', borderRadius: '1rem', width: '95%', maxWidth: '600px',
    fontFamily: 'sans-serif', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', overflowY: 'auto', maxHeight: '90vh'
  },
  image: {
    width: '100%', borderRadius: '10px', marginTop: '1rem'
  },
  video: {
    width: '100%', marginTop: '1rem', borderRadius: '10px'
  },
  closeBtn: {
    marginTop: '1.5rem', background: '#007bff', color: '#fff', border: 'none', padding: '0.7rem 1.2rem',
    borderRadius: '5px', cursor: 'pointer'
  }
};

export default PollDetailsModal;
