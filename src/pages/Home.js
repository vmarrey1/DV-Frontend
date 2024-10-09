import Navigation from "./components/NavigationBar.js";
import EnterFile from "./components/MainForm.js";
import ThreeCards from "./components/ThreeCards.js";
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Home.css';
import HowTo from "./components/VisualizationUI.js"

function Home() {    
  return (
    <div className="App">
      
      <div className = "mainform"><EnterFile  /> </div>
      <HowTo/>
      <Footer className = "footer"  />  
      
    </div>
  );
}

export default Home;