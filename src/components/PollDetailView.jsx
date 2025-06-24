import React from 'react';

const PollDetailView = ({ poll, onClose }) => {
  if (!poll) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>X</button>
        <h2 style={{ marginBottom: '0.5rem' }}>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}</h2>

        {poll.pollDescription && <p style={styles.description}>{poll.pollDescription}</p>}

        <ul style={styles.optionList}>
          {poll.options.map((opt, i) => (
            <li key={i} style={styles.option}>{opt}</li>
          ))}
        </ul>

        {poll.images?.length > 0 && (
          <div style={styles.imageRow}>
            {poll.images.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt={`Option ${i + 1}`} style={styles.image} />
            ))}
          </div>
        )}

        {poll.video && (
          <video src={URL.createObjectURL(poll.video)} controls style={styles.video} />
        )}

        {poll.affiliateLinks?.map((link, i) => (
          link && (
            <p key={i} style={styles.link}>
              Affiliate {i + 1}: <a href={link} target="_blank" rel="noreferrer">{link}</a>
            </p>
          )
        ))}

        {poll.pledgeAmount > 0 && (
          <p style={styles.pledge}>Pledge: ${poll.pledgeAmount.toFixed(2)}</p>
        )}

        {poll.expiresAt && (
          <p style={styles.expiration}>Expires: {new Date(poll.expiresAt).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
  },
  description: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#333'
  },
  optionList: {
    paddingLeft: '1.25rem',
    marginBottom: '1rem'
  },
  option: {
    marginBottom: '0.5rem'
  },
  imageRow: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  video: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '8px'
  },
  link: {
    fontSize: '0.85rem',
    color: '#007bff',
    marginBottom: '0.25rem'
  },
  pledge: {
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  expiration: {
    fontSize: '0.85rem',
    color: '#888'
  }
};

export default PollDetailView;
