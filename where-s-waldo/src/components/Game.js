import "./Game.css";
import image from "./level-1.jpg";
import React, { useEffect, useState } from "react";

function Game() {
  const Waldo = { minX: 522, maxX: 550, minY: 358, maxY: 441 };
  const Odlaw = { minX: 242, maxX: 256, minY: 363, maxY: 426 };
  const Wizard = { minX: 628, maxX: 652, minY: 360, maxY: 415 };
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

  const menuStyle = {
    position: "absolute",
    top: `${mouseY}px`,
    left: `${mouseX}px`,
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
    setImageX(e.pageX - e.target.offsetLeft);
    setImageY(e.pageY - e.target.offsetTop);
    setMouseX(e.clientX + 1);
    setMouseY(e.clientY + 1);
  };

  const handleMenuClick = (e) => {
    setSelection(e.target.textContent);
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    if (imageX > Waldo.minX && imageX < Waldo.maxX && imageY > Waldo.minY && imageY < Waldo.maxY) {
      setClickCharacter("Waldo");
    } else if (
      imageX > Odlaw.minX &&
      imageX < Odlaw.maxX &&
      imageY > Odlaw.minY &&
      imageY < Odlaw.maxY
    ) {
      setClickCharacter("Odlaw");
    } else if (
      imageX > Wizard.minX &&
      imageX < Wizard.maxX &&
      imageY > Wizard.minY &&
      imageY < Wizard.maxY
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
    console.log(`selection ${selection}`, `clickCharacter ${clickCharacter}`, correctWaldo);
  }, [selection, clickCharacter, correctWaldo]);

  return (
    <div className="Game">
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
