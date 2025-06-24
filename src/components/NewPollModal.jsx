import React, { useEffect, useState } from 'react';

const PollFeed = ({ polls }) => {
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
          <div key={index} style={styles.card}>
            <h3>{poll.mode === 'poll' ? 'Poll' : '2nd Opinion'}: {poll.options?.[0]}</h3>
            <ul>
              {poll.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            {poll.pollDescription && (
              <p style={{ marginTop: '0.5rem' }}>{poll.pollDescription}</p>
            )}
            {poll.affiliateLinks?.[0] && (
              <p style={{ fontSize: '0.85rem', color: '#007bff' }}>
                Affiliate: <a href={poll.affiliateLinks[0]} target="_blank" rel="noreferrer">{poll.affiliateLinks[0]}</a>
              </p>
            )}
            {poll.pledgeAmount && (
              <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Pledge: ${poll.pledgeAmount.toFixed(2)}</p>
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
    backgroundColor: '#fff'
  }
};

export default PollFeed;
