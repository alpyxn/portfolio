import '../App.css';
import { useState } from 'react';
import reactLogo from "../assets/react.svg";
import typeScriptLogo from "../assets/typescript.png";
import springBootLogo from "../assets/springboot.png";
import postgreSQLLogo from "../assets/postgresql.png";
import svelteLogo from "../assets/svelte.png";
import tailwindLogo from "../assets/tailwind.png";
import mongoLogo from "../assets/mongo.png";
import dockerLogo from "../assets/docker.png";
import gitLogo from "../assets/git.png";

interface TechItem {
  name: string;
  logo: string;
  alt: string;
  description?: string;
}

interface TechCategory {
  id: string;
  name: string;
  items: TechItem[];
}

function TechStack() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const techCategories: TechCategory[] = [
    {
      id: "frontend",
      name: "Frontend",
      items: [
        { 
          name: "React", 
          logo: reactLogo, 
          alt: "React logo",
          description: "Library of choice for building interactive UIs" 
        },
        { 
          name: "TypeScript", 
          logo: typeScriptLogo, 
          alt: "TypeScript logo",
          description: "For type-safe JavaScript development" 
        },
        { 
          name: "Svelte", 
          logo: svelteLogo, 
          alt: "Svelte logo",
          description: "Compile-time framework with less boilerplate" 
        },
        { 
          name: "Tailwind CSS", 
          logo: tailwindLogo, 
          alt: "Tailwind CSS logo",
          description: "Utility-first CSS framework" 
        }
      ]
    },
    {
      id: "backend",
      name: "Backend",
      items: [
        { 
          name: "Spring Boot", 
          logo: springBootLogo, 
          alt: "Spring Boot logo",
          description: "Java-based framework for microservices" 
        }
      ]
    },
    {
      id: "database",
      name: "Database",
      items: [
        { 
          name: "PostgreSQL", 
          logo: postgreSQLLogo, 
          alt: "PostgreSQL logo",
          description: "Advanced open source SQL database" 
        },
        { 
          name: "MongoDB", 
          logo: mongoLogo, 
          alt: "MongoDB logo",
          description: "NoSQL database for flexible schemas" 
        }
      ]
    },
    {
      id: "tools",
      name: "Tools & DevOps",
      items: [
        { 
          name: "Docker", 
          logo: dockerLogo, 
          alt: "Docker logo",
          description: "Containerization for consistent environments" 
        },
        { 
          name: "Git", 
          logo: gitLogo, 
          alt: "Git logo",
          description: "Version control for all projects" 
        }
      ]
    }
  ];

  const activeCategoryData = techCategories.find(cat => cat.id === activeCategory) || techCategories[0];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-all duration-300
                ${activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-900/20"
                  : "bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 relative">
          <h2 className="text-xl md:text-2xl font-bold mb-6 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-glow">
              {activeCategoryData.name} Technologies
            </span>
          </h2>

          <div className="absolute -inset-10 bg-gradient-radial from-blue-500/10 to-transparent opacity-40 blur-3xl -z-10"></div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {activeCategoryData.items.map((tech) => (
              <div 
                key={tech.name}
                className="tech-card w-full max-w-[200px] name-container"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="tech-icon-container bg-gradient-to-br from-black/40 to-black/60 p-2 rounded-lg flex-shrink-0 mb-3">
                    <img 
                      src={tech.logo} 
                      alt={tech.alt} 
                      className="tech-svg w-10 h-10 md:w-12 md:h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-gradient-blue-purple text-lg md:text-xl font-medium">{tech.name}</h3>
                    <p className="text-blue-200/80 text-xs md:text-sm mt-1">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStack;