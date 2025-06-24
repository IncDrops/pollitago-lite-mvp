import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PollDetail = ({ polls }) => {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const poll = polls?.[pollId];

  if (!poll) {
    return <p>Poll not found.</p>;
  }

  const timeLeft = (() => {
    const difference = new Date(poll.expiresAt) - new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  })();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
        <h2>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}</h2>
        <p style={styles.description}>{poll.pollDescription}</p>

        <ul style={styles.optionsList}>
          {poll.options.map((opt, i) => (
            <li key={i}><strong>Option {i + 1}:</strong> {opt}</li>
          ))}
        </ul>

        {poll.images?.length > 0 && (
          <div style={styles.mediaWrap}>
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
              Affiliate {i + 1}: <a href={link} target="_blank" rel="noreferrer">{link}</a>
            </p>
          )
        ))}

        {poll.pledgeAmount && (
          <p style={styles.pledge}>Pledge: ${poll.pledgeAmount.toFixed(2)}</p>
        )}

        {poll.expiresAt && (
          <p style={styles.timer}>Time Left: {timeLeft}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', backgroundColor: '#f5f5f5'
  },
  card: {
    background: '#fff', padding: '2rem', borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '600px', width: '90%',
    fontFamily: 'sans-serif'
  },
  backBtn: {
    background: 'none', border: 'none', color: '#007bff',
    marginBottom: '1rem', cursor: 'pointer', fontSize: '1rem'
  },
  description: {
    fontSize: '1rem', marginBottom: '1rem'
  },
  optionsList: {
    listStyle: 'none', padding: 0, marginBottom: '1rem'
  },
  mediaWrap: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'
  },
  image: {
    width: '100%', borderRadius: '8px'
  },
  video: {
    width: '100%', borderRadius: '8px', marginTop: '1rem'
  },
  link: {
    fontSize: '0.9rem', color: '#007bff', marginBottom: '0.5rem'
  },
  pledge: {
    fontWeight: 'bold', marginTop: '1rem'
  },
  timer: {
    marginTop: '0.5rem', color: '#555'
  }
};

export default PollDetail;
