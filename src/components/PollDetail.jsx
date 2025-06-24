import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PollDetailView = ({ poll, onClose }) => {
  if (!poll) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={styles.overlay}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={styles.modal}
        >
          <button onClick={onClose} style={styles.closeButton}>✕</button>

          <h2>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}</h2>

          {poll.pollDescription && (
            <p style={styles.description}>{poll.pollDescription}</p>
          )}

          <ul>
            {poll.options?.map((opt, i) => (
              <li key={i} style={styles.option}>
                <strong>Option {i + 1}:</strong> {opt}
              </li>
            ))}
          </ul>

          {poll.images?.length > 0 && (
            <div style={styles.imageGrid}>
              {poll.images.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt={`Option ${idx + 1}`} style={styles.image} />
              ))}
            </div>
          )}

          {poll.affiliateLinks?.map((link, i) =>
            link ? (
              <p key={i}>
                Affiliate Link {i + 1}:{' '}
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </p>
            ) : null
          )}

          {poll.pledgeAmount && (
            <p><strong>Pledge:</strong> ${poll.pledgeAmount.toFixed(2)}</p>
          )}

          {poll.expiresAt && (
            <p>
              <strong>Ends:</strong> {new Date(poll.expiresAt).toLocaleString()}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '1rem',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    fontFamily: 'sans-serif',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
  },
  description: {
    marginBottom: '1rem',
    fontStyle: 'italic',
  },
  option: {
    marginBottom: '0.5rem',
  },
  imageGrid: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
};

export default PollDetailView;
