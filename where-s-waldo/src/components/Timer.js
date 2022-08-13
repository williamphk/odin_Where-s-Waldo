import "./Timer.css";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Scoreboard from "./Scoreboard";

// Your web app's Firebase configuration

function Timer(props) {
  const [submited, setSubmited] = useState(false);

  const app = initializeApp(props.firebaseConfig);
  const db = getFirestore(app);

  const handleSubmit = (e, playerName, playerTime) => {
    setSubmited(true);
    const writeData = async () => {
      await setDoc(doc(db, "scoreboard", playerName), {
        name: playerName,
        time: playerTime,
      });
    };
    writeData();
  };
  if (submited) {
    return <Scoreboard firebaseConfig={props.firebaseConfig} />;
  } else {
    return (
      <div className="Timer">
        <div>Your record:</div>
        <div>
          {props.recordTime}
          <span>s</span>
        </div>
        <input type="text" id="name" placeholder="Your Name" required />
        <button
          type="button"
          onClick={(e) => handleSubmit(e, document.getElementById("name").value, props.recordTime)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Timer;
