import "./Scoreboard.css";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Scoreboard(props) {
  // Initialize Firebase
  const app = initializeApp(props.firebaseConfig);
  const db = getFirestore(app);
  const [scoreboardCollection, setScoreboardCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const scoreboardCollection = await getDocs(collection(db, "scoreboard"));
      let array = [];
      scoreboardCollection.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        array.push(doc.data());
      });

      array.sort((a, b) => {
        return a.time - b.time;
      });
      setScoreboardCollection(array.slice(0, 10));
    };
    fetchData();
  }, [db]);

  useEffect(() => {
    console.log(scoreboardCollection);
  }, [scoreboardCollection]);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="Scoreboard">
      <div className="scoreboardTitle">Scoreboard (Top 10)</div>
      {scoreboardCollection.map((player) => {
        return (
          <div>
            {player.name}: {player.time}s
          </div>
        );
      })}
      <button onClick={refreshPage}>Restart</button>
    </div>
  );
}

export default Scoreboard;
