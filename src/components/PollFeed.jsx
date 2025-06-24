import React from 'react';

const PollFeed = ({ polls }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      {polls.map((poll, index) => (
        <div key={index} style={styles.card}>
          <h3>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}: {poll.options?.[0]}</h3>
          <ul>
            {poll.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          {poll.affiliateLinks?.[0] && (
            <p style={{ fontSize: '0.85rem', color: '#007bff' }}>
              Affiliate: <a href={poll.affiliateLinks[0]} target="_blank" rel="noreferrer">{poll.affiliateLinks[0]}</a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    backgroundColor: '#fff'
  }
};

export default PollFeed;
