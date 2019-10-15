import React, { useContext } from "react";
import "./App.css";

function Page2({ match }) {
  return (
    <div className="main">
      <h2>{match.url}</h2>
    </div>
  );
}

export default Page2;
