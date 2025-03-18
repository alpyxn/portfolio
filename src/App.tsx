import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RocketBackground } from "./components/RocketBackground";
import { Navbar } from "./components/navbar";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Home from "./pages/Home";



function App() {
  return (
    <Router>
      <RocketBackground>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/techstack" element={<TechStack />} />
          <Route path="/work" element={<Projects />} />
        </Routes>
      </RocketBackground>
    </Router>
  );
}

export default App;
