import React, { useEffect, useState } from 'react';
import PollDetailsModal from './components/PollDetailsModal';


const PollFeed = ({ polls }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      {polls.map((poll, index) => (
        <div key={index} style={styles.card}>
          <h3>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}</h3>
          <p style={styles.description}>{poll.pollDescription}</p>

          {poll.descriptions?.map((desc, i) => (
            <div key={i} style={styles.optionBox}>
              <strong>Option {i + 1}:</strong> <span>{desc}</span>
            </div>
          ))}

          {poll.images?.length > 0 && (
            <div style={styles.imageGrid}>
              {poll.images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} alt={`Option ${i + 1}`} style={styles.image} />
              ))}
            </div>
          )}

          {poll.video && (
            <video controls style={styles.video}>
              <source src={URL.createObjectURL(poll.video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {poll.affiliateLinks?.map((link, i) => (
            link && (
              <p key={i} style={styles.link}>
                Link {i + 1}:{' '}
                <a href={link} target="_blank" rel="noreferrer">{link}</a>
              </p>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
  border: '1px solid #ddd',
  padding: '1.5rem',
  borderRadius: '1.25rem',
  marginBottom: '1.5rem',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
},
  description: {
    marginBottom: '1rem',
    fontStyle: 'italic',
    color: '#333'
  },
  optionBox: {
    marginBottom: '0.5rem'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '0.5rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  image: {
    width: '100%',
    borderRadius: '5px'
  },
  video: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '5px'
  },
  link: {
    fontSize: '0.85rem',
    color: '#007bff'
  }
};

export default PollFeed;
