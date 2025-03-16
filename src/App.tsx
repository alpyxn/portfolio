import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RocketBackground } from "./components/RocketBackground";
import { Navbar } from "./components/navbar";
import Projects from "./pages/Projects";
import reactLogo from "./assets/react.svg";
import typeScriptLogo from "./assets/typescript.png";
import springBootLogo from "./assets/springboot.png";
import postgreSQLLogo from "./assets/postgresql.png";

// Page components
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-20">
        <div className="name-container relative">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-wider">
            <span className="block text-gradient-blue-purple animate-glow">
              ALPER RASİM
            </span>
            <br />
            <span className="block text-gradient-purple-pink animate-glow-delayed">
              GÜRSOY
            </span>
          </h1>

          <div className="absolute -inset-10 bg-gradient-radial from-blue-500/20 to-transparent opacity-50 blur-3xl -z-10"></div>
        </div>

        <div className="mt-10 flex justify-center space-x-6">
          <a
            href="https://github.com/alpyxn"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link group"
          >
            <svg
              className="w-7 h-7 text-white transition-all duration-300 group-hover:text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/alpyxn"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link group"
          >
            <svg
              className="w-7 h-7 text-white transition-all duration-300 group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute mt-7 bottom-12 md:bottom-16 inset-x-0 text-center">
        <div className="inline-block">
          <span className="text-xl md:text-2xl font-bold px-6 py-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-full border border-white/10 text-white animate-pulse-slow">
            Tech Enthusiast
          </span>
        </div>
      </div>
    </div>
  );
};

const TechStack = () => (
  <div className="min-h-screen flex items-center justify-center pt-16">
    <div className="p-6 max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg z-10 border border-white/20">
      <h1 className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-5 text-center">
        My Tech Stack
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="tech-card">
          <div className="tech-icon-container bg-gradient-to-br from-black/40 to-black/60">
            <img
              src={reactLogo}
              alt="React"
              className="tech-svg w-12 h-12"
            />
          </div>
          <span className="tech-name">React</span>
        </div>

        <div className="tech-card">
          <div className="tech-icon-container bg-gradient-to-br from-black/40 to-black/60">
            <img
              src={springBootLogo}
              alt="React"
              className="tech-svg w-12 h-12"
            />
          </div>
          <span className="tech-name">Spring</span>
        </div>

        <div className="tech-card">
          <div className="tech-icon-container bg-gradient-to-br from-black/40 to-black/60">
            <img
              src={typeScriptLogo}
              alt="React"
              className="tech-svg w-12 h-12"
            />
          </div>
          <span className="tech-name">TypeScript</span>
        </div>

        <div className="tech-card">
          <div className="tech-icon-container bg-gradient-to-br from-black/40 to-black/60">
            <img
              src={postgreSQLLogo}
              alt="React"
              className="tech-svg w-12 h-12"
            />
          </div>
          <span className="tech-name">PostgreSQL</span>
        </div>
      </div>
    </div>
  </div>
);

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
