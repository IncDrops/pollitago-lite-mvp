import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SecondOpinionDetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const opinion = location.state?.opinion;

  if (!opinion) {
    return <p>No opinion data found.</p>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Back
      </button>
      <h2 style={styles.title}>2nd Opinion Request</h2>
      <p style={styles.description}>{opinion.pollDescription}</p>

      {opinion.images?.length > 0 && (
        <div style={styles.imageGrid}>
          {opinion.images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`Option ${idx + 1}`}
              style={styles.image}
            />
          ))}
        </div>
      )}

      {opinion.options.map((option, i) => (
        <div key={i} style={styles.optionBox}>
          <p style={styles.optionText}>{option}</p>
        </div>
      ))}

      {opinion.pledgeAmount && (
        <p style={styles.pledge}>Pledge: ${opinion.pledgeAmount.toFixed(2)}</p>
      )}

      {opinion.expiresAt && (
        <p style={styles.expiration}>Expires: {new Date(opinion.expiresAt).toLocaleString()}</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '1.5rem',
    borderRadius: '1rem',
    background: '#fff',
    maxWidth: '600px',
    margin: '2rem auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem'
  },
  description: {
    fontSize: '1rem',
    marginBottom: '1rem'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  image: {
    width: '100%',
    borderRadius: '0.5rem',
    objectFit: 'cover'
  },
  optionBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '0.75rem',
    marginBottom: '0.5rem'
  },
  optionText: {
    fontSize: '0.95rem'
  },
  pledge: {
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  expiration: {
    fontSize: '0.85rem',
    color: '#999',
    marginTop: '0.5rem'
  }
};

export default SecondOpinionDetailView;
