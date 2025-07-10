import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Home from "./pages/Home";
import Books from "./pages/Books";



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Subtle background overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/techstack" element={<TechStack />} />
            <Route path="/work" element={<Projects />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
