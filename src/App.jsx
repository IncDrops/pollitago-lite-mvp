import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PollFeed from "./components/PollFeed";
import NewPollModal from "./components/NewPollModal";
import PollDetailView from "./components/PollDetailView";
import SecondOpinionDetailView from "./components/SecondOpinionDetailView";
import BottomNavBar from "./components/BottomNavBar";


const App = () => {
  const [polls, setPolls] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button
                onClick={() => setShowModal(true)}
                style={{ marginTop: "2rem" }}
              >
                Create New Poll
              </button>
              <PollFeed polls={polls} />
              {showModal && (
                <NewPollModal
                  onClose={() => setShowModal(false)}
                  addPoll={(poll) => setPolls([...polls, poll])}
                />
              )}
            </>
          }
        />
        <Route path="/poll/:id" element={<PollDetailView polls={polls} />} />
        <Route
          path="/second-opinion/:id"
          element={<SecondOpinionDetailView polls={polls} />}
        />
      </Routes>
      <BottomNavBar />
    </Router>
  );
};

export default App;
