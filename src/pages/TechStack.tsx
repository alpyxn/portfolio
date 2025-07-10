import '../App.css';
import { useState, memo } from 'react';
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

// Animated grid background
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, #3b82f6 1px, transparent 1px),
          linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        animation: 'grid-move 20s linear infinite'
      }}></div>
    </div>
  );
};

// Enhanced tech item component with Magic UI effects
const TechItemComponent = memo(({ tech, index }: { tech: TechItem; index: number }) => (
  <div 
    className="group tech-item relative overflow-hidden"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Shimmer effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
        <img 
          src={tech.logo} 
          alt={tech.alt} 
          className="tech-icon relative z-10"
          loading="lazy"
          width={48}
          height={48}
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
        {tech.name}
      </h3>
      <p className="text-gray-600 text-sm text-center group-hover:text-gray-700 transition-colors duration-300">
        {tech.description}
      </p>
    </div>
  </div>
));

TechItemComponent.displayName = 'TechItem';

// Enhanced category tab component
const CategoryTab = ({ category, isActive, onClick }: { 
  category: TechCategory; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`group relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden
      ${isActive
        ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-500/25"
        : "bg-white text-gray-700 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}
  >
    {/* Shimmer effect for inactive tabs */}
    {!isActive && (
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
    )}
    
    {/* Active tab gradient animation */}
    {isActive && (
      <span className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
    )}
    
    <span className="relative z-10">{category.name}</span>
  </button>
);

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
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen relative overflow-hidden">
      <AnimatedGrid />
      
      <div className="section-padding pt-16 relative z-10">
        <div className="container-max-width">
          {/* Enhanced header section */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="heading-secondary mb-4 text-gray-900 animate-fade-in">
                <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500">
                  Technology Stack
                </span>
              </h1>

              {/* Enhanced category tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up-delay">
                {techCategories.map((category) => (
                  <CategoryTab
                    key={category.id}
                    category={category}
                    isActive={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced content card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 rounded-2xl"></div>
            <div className="card-professional rounded-2xl p-8 relative border-2 border-blue-100/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5 rounded-2xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  <span className="bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                    {activeCategoryData.name} Technologies
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {activeCategoryData.items.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="animate-slide-up"
                      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                      <TechItemComponent tech={tech} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default TechStack;