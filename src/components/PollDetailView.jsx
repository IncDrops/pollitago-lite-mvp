import React from 'react';

const PollDetailView = ({ poll, onClose }) => {
  if (!poll) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'} Details</h2>
        
        {poll.pollDescription && (
          <p style={styles.description}>{poll.pollDescription}</p>
        )}

        {poll.options.map((option, idx) => (
          <div key={idx} style={styles.optionBox}>
            <strong>Option {idx + 1}:</strong>
            <p>{option}</p>
          </div>
        ))}

        {poll.images?.length > 0 && (
          <div style={styles.mediaRow}>
            {poll.images.map((img, i) => (
              <img key={i} src={img} alt={`Option ${i + 1}`} style={styles.image} />
            ))}
          </div>
        )}

        {poll.video && (
          <video controls style={styles.video}>
            <source src={poll.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {poll.affiliateLinks?.map((link, i) => (
          link && (
            <p key={i}>
              <a href={link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Affiliate Link {i + 1}
              </a>
            </p>
          )
        ))}

        {poll.pledgeAmount && (
          <p style={styles.pledge}>
            💸 Pre-commitment Pledge: ${poll.pledgeAmount.toFixed(2)}
          </p>
        )}

        {poll.expiresAt && (
          <p style={styles.expiry}>
            ⏰ Expires: {new Date(poll.expiresAt).toLocaleString()}
          </p>
        )}

        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '2rem',
    padding: '2rem',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
    fontFamily: 'sans-serif',
    animation: 'fadeIn 0.4s ease-in-out'
  },
  description: {
    marginBottom: '1.5rem',
    fontSize: '1rem',
    color: '#333'
  },
  optionBox: {
    backgroundColor: '#f5f5f5',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    marginBottom: '1rem'
  },
  mediaRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '0.75rem'
  },
  video: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.75rem'
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    fontSize: '0.95rem'
  },
  pledge: {
    marginTop: '1rem',
    fontWeight: 'bold'
  },
  expiry: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#555'
  },
  closeButton: {
    marginTop: '2rem',
    background: '#000',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '1rem',
    cursor: 'pointer'
  }
};

export default PollDetailView;
