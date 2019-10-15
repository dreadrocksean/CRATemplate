import React, { useContext } from "react";
import "./App.css";

function Page1({ match }) {
  return (
    <div className="main">
      <h2>{match.url}</h2>
    </div>
  );
}

export default Page1;
