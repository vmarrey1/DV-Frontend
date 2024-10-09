import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home.js";
import Navigation from "./pages/components/NavigationBar.js";
import Data from "./pages/Data.js"

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation className = "Navigator"/>
        
        <Routes> 
          <Route path="/" element = {<Home /> } /> 
          <Route path= "/data" element = {<Data /> } /> 
        </Routes>  
        
    </Router>
    </div> )
}

export default App;
