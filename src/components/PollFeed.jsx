import React, { useEffect, useState } from 'react';

const PollFeed = ({ polls, onPollClick }) => {
  const calculateTimeLeft = (expiresAt) => {
    const difference = new Date(expiresAt) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {polls.map((poll, index) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(poll.expiresAt));

        useEffect(() => {
          const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(poll.expiresAt));
          }, 60000);

          return () => clearInterval(timer);
        }, [poll.expiresAt]);

        const timeStyle =
          timeLeft.days === 0 && timeLeft.hours < 1
            ? { color: 'red', fontWeight: 'bold' }
            : {};

        return (
          <div
            key={index}
            style={styles.card}
            onClick={() => onPollClick(poll)}
          >
            <h3>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}</h3>
            {poll.pollDescription && (
              <p style={styles.description}>
                {poll.pollDescription.length > 125
                  ? `${poll.pollDescription.slice(0, 125)}...`
                  : poll.pollDescription}
              </p>
            )}
            <ul>
              {poll.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            {poll.affiliateLinks?.map((link, i) => (
              link && (
                <p key={i} style={styles.affiliate}>
                  Affiliate {i + 1}: <a href={link} target="_blank" rel="noreferrer">{link}</a>
                </p>
              )
            ))}
            {poll.pledgeAmount && (
              <p style={styles.pledge}>Pledge: ${poll.pledgeAmount.toFixed(2)}</p>
            )}
            {poll.expiresAt && (
              <p style={{ ...timeStyle, fontSize: '0.85rem' }}>
                Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  },
  description: {
    fontSize: '0.95rem',
    marginBottom: '0.75rem',
    color: '#444'
  },
  affiliate: {
    fontSize: '0.85rem',
    color: '#007bff'
  },
  pledge: {
    marginTop: '0.5rem',
    fontWeight: 'bold'
  }
};

export default PollFeed;
