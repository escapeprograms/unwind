import logo from './logo.svg';
import './App.css';
import './global/global.css';
import Nav from "./nav/Nav.js"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Demo from './demo/Demo';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/demo" element={<Demo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
