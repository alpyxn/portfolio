import { useState } from 'react';
import { ProjectCard, ProjectProps } from '../components/ProjectCard';

const projectsData: ProjectProps[] = [
  {
    id: 1,
    title: "Cosmic Dashboard",
    description: "Interactive analytics platform with space-themed visualizations and real-time data monitoring.",
    shortDescription: "Analytics platform with space-themed visualizations",
    images: [
      { src: "/images/projects/cosmic-dashboard-1.jpg", alt: "Cosmic Dashboard main view" },
      { src: "/images/projects/cosmic-dashboard-2.jpg", alt: "Analytics screen" }
    ],
    technologies: [
      { name: "React", color: "#61DAFB88" },
      { name: "TypeScript", color: "#3178C688" },
      { name: "D3.js", color: "#F9A03C88" },
      { name: "Firebase", color: "#FFCA2888" }
    ],
    demoUrl: "https://cosmic-dashboard.example.com",
    githubUrl: "https://github.com/username/cosmic-dashboard",
    gradientColors: "from-blue-600 to-purple-900"
  },
  {
    id: 2,
    title: "Galaxy API",
    description: "RESTful backend service with Spring Boot and PostgreSQL featuring comprehensive documentation.",
    shortDescription: "Spring Boot and PostgreSQL backend service",
    images: [
      { src: "/images/projects/galaxy-api-1.jpg", alt: "API architecture diagram" },
      { src: "/images/projects/galaxy-api-2.jpg", alt: "API Documentation" }
    ],
    technologies: [
      { name: "Spring", color: "#6DB33F88" },
      { name: "PostgreSQL", color: "#336791BB" },
      { name: "Docker", color: "#2496ED88" },
      { name: "Swagger", color: "#85EA2D88" }
    ],
    githubUrl: "https://github.com/username/galaxy-api",
    gradientColors: "from-green-600 to-blue-800"
  },
  {
    id: 3,
    title: "Stellar Portfolio",
    description: "Interactive portfolio with particle animations built with React, TypeScript and PixiJS.",
    shortDescription: "React & TypeScript portfolio with animations",
    images: [
      { src: "/images/projects/stellar-portfolio-1.jpg", alt: "Homepage with animations" },
      { src: "/images/projects/stellar-portfolio-2.jpg", alt: "Project showcase" }
    ],
    technologies: [
      { name: "React", color: "#61DAFB88" },
      { name: "TypeScript", color: "#3178C688" },
      { name: "PixiJS", color: "#E7272788" },
      { name: "Tailwind", color: "#06B6D488" }
    ],
    demoUrl: "https://stellar-portfolio.example.com",
    githubUrl: "https://github.com/username/stellar-portfolio",
    gradientColors: "from-purple-600 to-pink-800"
  }
];

export default function Projects() {
  const [selectedCategory] = useState("All");
  
  const filteredProjects = projectsData.filter(project => 
    selectedCategory === "All" || project.technologies.some(tech => tech.name === selectedCategory)
  );

  return (
    <div className="min-h-screen pt-14 sm:pt-16 px-2 sm:px-4 pb-6 sm:pb-8">
      <div className="max-w-4xl mx-auto mb-4 sm:mb-6 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My Work
          </span>
        </h1>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto text-center py-6">
          <svg className="w-10 h-10 mx-auto text-blue-300/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-base sm:text-lg text-white mb-1">No projects found</h3>
          <p className="text-blue-200 text-xs">Try selecting a different filter</p>
        </div>
      )}

      <div className="mt-8 sm:mt-10 max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-white/10 text-center">
        <svg 
          className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-white mb-2" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">Want to see more?</h2>
        
        <a
          href="https://github.com/alpyxn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-medium rounded-md transition-colors shadow-md"
        >
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Visit My GitHub Profile
        </a>
      </div>
    </div>
  );
}
