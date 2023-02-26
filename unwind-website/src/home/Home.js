import "./Home.css"
import Hero from "./Hero";
import About from "./About.js"

const Home = props => {
  return (
    <div id="home">
        <Hero/>
        <About/>
    </div>
  )
}

export default Home;