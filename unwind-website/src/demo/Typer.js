import "./Demo.css";
import words from "./words.js"
import React, { useEffect, useState } from 'react';


const Typer = props => {
  const [letter, setLetter] = useState(0);
  const [typed, setTyped] = useState("")
  const [untyped, setUntyped] = useState("")

  useEffect(() => {
    //web socket
    
    // get words
    let wordList = words.split("\n");
    let displayWords = "";
    for (var i = 0; i < 50; i++) {
        displayWords += wordList[Math.floor(Math.random() * wordList.length)] + " "
    }
    setUntyped(displayWords);
  },[]);

  useEffect(() => {
    document.addEventListener("keydown", handler)
    return () => {
      document.removeEventListener("keydown", handler)
    }
  })

  const handler = (event) => {
    // changing the state to the name of the key
    // which is pressed
    if (event.key == untyped[0]) {
      
      setLetter(letter + 1);
      setTyped(typed + untyped[0]);
      setUntyped(untyped.substring(1))
    }
    if (event.key === " ") {
      event.preventDefault();
    }
  };
  return (
    <div class="monkey">
      <span className="typed">{typed}</span>
      <span className="untyped">{untyped}</span>
    </div>
  )
}

export default Typer;