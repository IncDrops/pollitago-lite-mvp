import React from "react";
import { useParams } from "react-router-dom";

const SecondOpinionDetailView = ({ polls }) => {
  const { id } = useParams();
  const poll = polls?.[id];

  if (!poll) return <p>Poll not found.</p>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>2nd Opinion</h2>
        {poll.pollDescription && (
          <p style={styles.description}>{poll.pollDescription}</p>
        )}
        <div style={styles.options}>
          {poll.options?.map((opt, i) => (
            <div key={i} style={styles.option}>
              <p>{opt}</p>
              {poll.images?.[i] && (
                <img
                  src={URL.createObjectURL(poll.images[i])}
                  alt={`Option ${i + 1}`}
                  style={styles.image}
                />
              )}
            </div>
          ))}
        </div>
        {poll.affiliateLinks?.map((link, i) =>
          link ? (
            <p key={i} style={styles.link}>
              Affiliate {i + 1}: <a href={link} target="_blank" rel="noreferrer">{link}</a>
            </p>
          ) : null
        )}
        {poll.pledgeAmount && (
          <p style={styles.pledge}>Pledge: ${poll.pledgeAmount.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1rem",
  },
  option: {
    background: "#f9f9f9",
    padding: "0.75rem",
    borderRadius: "0.5rem",
  },
  image: {
    marginTop: "0.5rem",
    maxWidth: "100%",
    borderRadius: "0.5rem"
  },
  link: {
    fontSize: "0.85rem",
    color: "#007bff",
    marginBottom: "0.5rem",
  },
  pledge: {
    fontWeight: "bold",
    marginTop: "1rem",
  }
};

export default SecondOpinionDetailView;
