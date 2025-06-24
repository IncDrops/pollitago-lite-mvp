import React, { useState } from "react";

const NewPollModal = ({ onClose, onCreatePoll }) => {
  const [mode, setMode] = useState("poll");
  const [pollDescription, setPollDescription] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [affiliateLinks, setAffiliateLinks] = useState(["", "", "", ""]);
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = () => {
    const newPoll = {
      mode,
      pollDescription,
      options,
      images,
      video,
      affiliateLinks,
      pledgeAmount: parseFloat(pledgeAmount) || 0,
      expiresAt,
    };
    onCreatePoll(newPoll);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Create New {mode === "poll" ? "Poll" : "2nd Opinion"}</h2>

        <textarea
          placeholder="Poll Description (max 500 characters)"
          maxLength={500}
          value={pollDescription}
          onChange={(e) => setPollDescription(e.target.value)}
          style={styles.textarea}
        />

        {options.map((desc, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1} Description (max 150 characters)`}
            maxLength={150}
            value={desc}
            onChange={(e) => {
              const updated = [...options];
              updated[i] = e.target.value;
              setOptions(updated);
            }}
            style={styles.input}
          />
        ))}

        <label style={styles.label}>Choose up to 4 images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files).slice(0, 4))}
        />

        <label style={styles.label}>Optional: Upload 1 video (max 60s)</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <label style={styles.label}>Affiliate Links</label>
        {affiliateLinks.map((link, i) => (
          <input
            key={i}
            type="url"
            placeholder={`Link ${i + 1}`}
            value={link}
            onChange={(e) => {
              const updated = [...affiliateLinks];
              updated[i] = e.target.value;
              setAffiliateLinks(updated);
            }}
            style={styles.input}
          />
        ))}

        <label style={styles.label}>Pre-Commitment Pledge ($)</label>
        <input
          type="number"
          placeholder="0.00"
          value={pledgeAmount}
          onChange={(e) => setPledgeAmount(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Expiration Date/Time</label>
        <input
          type="datetime-local"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.submit}>
          Poll it & Go
        </button>

        <p style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
          Poll responsibly, the ultimate decision still belongs to you.
        </p>

        <button onClick={onClose} style={styles.close}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "2rem",
    width: "90%",
    maxWidth: "600px",
    fontFamily: "sans-serif",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    margin: "0.5rem 0",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "80px",
    margin: "0.5rem 0",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  label: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
  submit: {
    marginTop: "1rem",
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  close: {
    marginTop: "1rem",
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
  },
};

export default NewPollModal;
