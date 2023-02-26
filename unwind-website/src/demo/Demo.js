import "./Demo.css";
import Typer from "./Typer.js";
import Status from "./Status";

const Demo = props => {
  return (
    <div id="demo">
      <div id="democontainer">
        <div className="half left">
          <div id="video">
            <iframe frameBorder="0" width="100%" height="100%" allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;" src="https://vdo.ninja/?view=UbLMrA4&cleanoutput&transparent"></iframe>
          </div>
        </div>
        <div className="half right">
          <Status/>
          <Typer/>
        </div>
      </div>
    </div>
  )
}

export default Demo;