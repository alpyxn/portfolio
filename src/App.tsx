import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RocketBackground } from "./components/RocketBackground";
import { Navbar } from "./components/navbar";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Home from "./pages/Home";
import FlowerBlossom from "./pages/FlowerBlossom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dilek" element={<FlowerBlossom />} />
        <Route path="*" element={
          <RocketBackground>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/techstack" element={<TechStack />} />
              <Route path="/work" element={<Projects />} />
            </Routes>
          </RocketBackground>
        } />
      </Routes>
    </Router>
  );
}

export default App;
