import "./Game.css";
import image from "./level-1.jpg";
import React, { useState } from "react";

function Game() {
  const Waldo = { minX: 522, maxX: 550, minY: 358, maxY: 441 };
  const Odlaw = { minX: 242, maxX: 256, minY: 363, maxY: 426 };
  const Wizard = { minX: 628, maxX: 652, minY: 360, maxY: 415 };
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuStyle = {
    position: "absolute",
    top: `${mouseY}px`,
    left: `${mouseX}px`,
  };

  const handleClick = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
    setImageX(e.pageX - e.target.offsetLeft);
    setImageY(e.pageY - e.target.offsetTop);
    setMouseX(e.clientX + 1);
    setMouseY(e.clientY + 1);
    console.log(imageX, imageY);
    if (imageX > Waldo.minX && imageX < Waldo.maxX && imageY > Waldo.minY && imageY < Waldo.maxY) {
      console.log("Waldo");
    } else if (
      imageX > Odlaw.minX &&
      imageX < Odlaw.maxX &&
      imageY > Odlaw.minY &&
      imageY < Odlaw.maxY
    ) {
      console.log("Odlaw");
    } else if (
      imageX > Wizard.minX &&
      imageX < Wizard.maxX &&
      imageY > Wizard.minY &&
      imageY < Wizard.maxY
    ) {
      console.log("Wizard");
    } else {
      console.log("Wrong");
    }
  };

  return (
    <div className="Game">
      <ul className={toggleMenu ? "menu" : "menu off"} style={menuStyle}>
        <li>Waldo</li>
        <li>Odlaw</li>
        <li>Wizard</li>
      </ul>
      <img src={image} alt="Map" onClick={handleClick} />
    </div>
  );
}

export default Game;
