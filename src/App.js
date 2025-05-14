import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <CurrentLocation />
      </div>
      <footer className="footer-info">
        Developed by{" "}
        <a
          href="https://github.com/vanshikach08"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vanshika Choudhary
        </a>
      </footer>
    </>
  );
}

export default App;
