import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        Developed by{" "}
        <a 
          target="_blank" 
          href="https://github.com/vanshikach08"
          rel="noopener noreferrer" // Fixed security issue
        >
          Vanshika Choudhary
        </a>{" "}
      </div>
    </React.Fragment>
  );
}

export default App;

