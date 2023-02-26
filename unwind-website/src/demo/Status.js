import React, { useEffect, useState } from 'react';
import "./Demo.css";
import io from 'socket.io-client';

const socket = io();

const Status = props => {
  const [posture, setPosture] = useState(true) //false = bad position, true = good position
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to the Server!")
    });

    socket.on('update', function(msg) {
      console.log(msg.data);
      setPosture(true)
    });

    return () => {
      socket.off('connect');
      socket.off('update');
    };
  }, []);
  
  return (
    <div id="statuswrap">
      <span id="status">{posture ? "👍" : "👎"}</span>
      <h2 class={posture ? "good" : "bad"}>Typing posture</h2>
    </div>
  )
}

export default Status;