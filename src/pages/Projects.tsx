import { useState } from 'react';
import { ProjectCard, ProjectProps } from '../components/ProjectCard';
import moviestar1 from '../assets/moviestar1.png';
import moviestar2 from '../assets/moviestar2.png';
import moviestar3 from '../assets/moviestar3.png';
import moviestar4 from '../assets/moviestar4.png';
import minustodo1 from '../assets/minustodo1.png';
import minustodo2 from '../assets/minustodo2.png';
import minustodo3 from '../assets/minustodo3.png';
import retail1 from '../assets/retail1.png';
import retail2 from '../assets/retail2.png';
import retail3 from '../assets/retail3.png';
import retail4 from '../assets/retail4.png';

// Enhanced floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gray-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Enhanced CTA section with clean design
const EnhancedCTA = () => {
  return (
    <div className="mt-16 relative">
      <div className="card-professional rounded-2xl p-8 text-center max-w-2xl mx-auto relative border-2 border-gray-100">
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Enhanced quote styling */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <span className="inline-block">
                <span className="block text-gray-800">My code is open-source.</span>
                <span className="block text-gray-600 text-lg font-medium mt-1">My sleep schedule is not.</span>
              </span>
            </h2>
          </div>
          
          <a
            href="https://github.com/alpyxn"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-gray-800 to-gray-900 px-8 font-medium text-white transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/25 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <svg className="w-5 h-5 mr-2 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="relative z-10">Visit GitHub Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const projectsData: ProjectProps[] = [
  {
    id: 1,
    title: "Moviestar",
    description: "Moviestar",
    shortDescription: "Moviestar is a movie rating platform where users can discuss & rate movies it has advanced admin controls",
    images: [
      { src: moviestar2, alt: "Landing Page" },
      { src: moviestar1, alt: "Movies Page" },
      { src: moviestar3, alt: "Admin Dashboard" },
      { src: moviestar4, alt: "User Profile Page" },
    ],
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Spring Boot", color: "#6BB543" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Docker", color: "#2496ED" }
    ],
    githubUrl: "https://github.com/alpyxn/moviestar",
    gradientColors: "bg-white"
  },
  {
    id: 2,
    title: "Minustodo",
    description: "Minustodo",
    shortDescription: "Todo app with keycloak auth",
    images: [
      { src: minustodo1, alt: "Landing page" },
      { src: minustodo3, alt: "Todo dashboard" },
      { src: minustodo2, alt: "Todo management" }
    ],
    technologies: [
      { name: "Spring Boot", color: "#6BB543" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Docker", color: "#2496ED" },
    ],
    githubUrl: "https://github.com/alpyxn/minustodo",
    gradientColors: "bg-white"
  },
  {
    id: 3,
    title: "Real Estate Automation",
    description: "Real Estate Automation Platform",
    shortDescription: "Comprehensive real estate automation platform with property management, listings, and automated workflows",
    images: [
      { src: retail1, alt: "Property Dashboard" },
      { src: retail2, alt: "Property Listings" },
      { src: retail3, alt: "Property Details" },
      { src: retail4, alt: "Management Interface" }
    ],
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "PostgreSQL", color: "#336791" }
    ],
    demoUrl: "https://demobayi.vercel.app",
    gradientColors: "bg-white"
  },
];

export default function Projects() {
  const [selectedCategory] = useState("All");
  
  const filteredProjects = projectsData.filter(project => 
    selectedCategory === "All" || project.technologies.some(tech => tech.name === selectedCategory)
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      <div className="section-padding pt-16 relative z-10">
        <div className="container-max-width">
          {/* Enhanced header section */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="heading-secondary mb-4 text-gray-900 animate-fade-in">
                <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500">
                  My Projects
                </span>
              </h1>
            </div>
          </div>
          
          {/* Projects grid with consistent heights */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="animate-slide-up h-full"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different filter</p>
            </div>
          )}

          <EnhancedCTA />
        </div>
      </div>
    </div>
  );
}
