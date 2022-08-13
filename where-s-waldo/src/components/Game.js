import "./Game.css";
import Timer from "./Timer";
import image from "./level-1.jpg";
import React, { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyiiLmOkx6fBCYXo_BvPh2Gg-izxVgazc",
  authDomain: "where-s-waldo-8b3a7.firebaseapp.com",
  projectId: "where-s-waldo-8b3a7",
  storageBucket: "where-s-waldo-8b3a7.appspot.com",
  messagingSenderId: "16083200344",
  appId: "1:16083200344:web:632192715ae1556bd61d2d",
};

function Game() {
  const [Waldo, setWaldo] = useState({});
  const [Odlaw, setOdlaw] = useState({});
  const [Wizard, setWizard] = useState({});
  //const Waldo = { minX: 522, maxX: 550, minY: 358, maxY: 441 };
  // const Odlaw = { minX: 242, maxX: 256, minY: 363, maxY: 426 };
  // const Wizard = { minX: 628, maxX: 652, minY: 360, maxY: 415 };
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selection, setSelection] = useState(null);
  const [clickCharacter, setClickCharacter] = useState(null);
  const [correctWaldo, setCorrectWaldo] = useState(false);
  const [correctOdlaw, setCorrectOdlaw] = useState(false);
  const [correctWizard, setCorrectWizard] = useState(false);
  const [correctAll, setCorrectAll] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);
  const [recordTime, setRecordTime] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const docRefWaldo = doc(db, "map", "Waldo");
      const docSnapWaldo = await getDoc(docRefWaldo);
      const docRefOdlaw = doc(db, "map", "Odlaw");
      const docSnapOdlaw = await getDoc(docRefOdlaw);
      const docRefWizard = doc(db, "map", "Wizard");
      const docSnapWizard = await getDoc(docRefWizard);
      setWaldo(docSnapWaldo.data());
      setOdlaw(docSnapOdlaw.data());
      setWizard(docSnapWizard.data());
    };
    fetchData();
  }, [db]);

  const menuStyle = {
    position: "absolute",
    top: `${mouseY}px`,
    left: `${mouseX}px`,
  };

  const handleImageClick = (e) => {
    if (correctAll) return;
    e.preventDefault();
    setToggleMenu(!toggleMenu);
    let rect = e.target.getBoundingClientRect();
    setImageX(e.clientX - rect.left);
    setImageY(e.clientY - rect.top);
    setMouseX(e.clientX + 1);
    setMouseY(e.clientY + 1);
    setRatio(e.target.clientWidth / 1024);
  };

  const handleMenuClick = (e) => {
    setSelection(e.target.textContent);
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    if (
      imageX > Waldo.minX * ratio &&
      imageX < Waldo.maxX * ratio &&
      imageY > Waldo.minY * ratio &&
      imageY < Waldo.maxY * ratio
    ) {
      setClickCharacter("Waldo");
    } else if (
      imageX > Odlaw.minX * ratio &&
      imageX < Odlaw.maxX * ratio &&
      imageY > Odlaw.minY * ratio &&
      imageY < Odlaw.maxY * ratio
    ) {
      setClickCharacter("Odlaw");
    } else if (
      imageX > Wizard.minX * ratio &&
      imageX < Wizard.maxX * ratio &&
      imageY > Wizard.minY * ratio &&
      imageY < Wizard.maxY * ratio
    ) {
      setClickCharacter("Wizard");
    }
  }, [
    imageX,
    Waldo.minX,
    Waldo.maxX,
    Waldo.minY,
    Waldo.maxY,
    imageY,
    Odlaw.minX,
    Odlaw.maxX,
    Odlaw.minY,
    Odlaw.maxY,
    Wizard.minX,
    Wizard.maxX,
    Wizard.minY,
    Wizard.maxY,
    ratio,
  ]);

  useEffect(() => {
    if (selection === "Waldo" && clickCharacter === "Waldo") {
      setCorrectWaldo(true);
    } else if (selection === "Odlaw" && clickCharacter === "Odlaw") {
      setCorrectOdlaw(true);
    } else if (selection === "Wizard" && clickCharacter === "Wizard") {
      setCorrectWizard(true);
    } else setSelection(null);
  }, [selection, clickCharacter]);

  useEffect(() => {
    if (correctWaldo && correctOdlaw && correctWizard) {
      setCorrectAll(true);
      setFinishTime(Date.now());
      setRecordTime(Math.abs((finishTime - startTime) / 1000).toFixed(2));
    }
  }, [correctOdlaw, correctWaldo, correctWizard, finishTime, startTime]);

  useEffect(() => {
    console.log(startTime, finishTime, recordTime);
  }, [startTime, finishTime, recordTime]);

  return (
    <div className="Game">
      {correctAll ? <Timer recordTime={recordTime} firebaseConfig={firebaseConfig} /> : null}
      <div>{correctWaldo ? "Waldo ✔" : null}</div>
      <div>{correctOdlaw ? "Odlaw ✔" : null}</div>
      <div>{correctWizard ? "Wizard ✔" : null}</div>
      <ul className={toggleMenu ? "menu" : "menu off"} style={menuStyle}>
        <li onClick={handleMenuClick}>Waldo</li>
        <li onClick={handleMenuClick}>Odlaw</li>
        <li onClick={handleMenuClick}>Wizard</li>
      </ul>
      <img src={image} alt="Map" onClick={handleImageClick} />
    </div>
  );
}

export default Game;
