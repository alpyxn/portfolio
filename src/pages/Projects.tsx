import { useState } from 'react';
import { ProjectCard, ProjectProps } from '../components/ProjectCard';
import moviestar1 from '../assets/moviestar1.png';
import moviestar2 from '../assets/moviestar2.png';
import moviestar3 from '../assets/moviestar3.png';
import moviestar4 from '../assets/moviestar4.png';
import minustodo1 from '../assets/minustodo1.png';
import minustodo2 from '../assets/minustodo2.png';
import minustodo3 from '../assets/minustodo3.png';

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
      { name: "React", color: "#61DAFB88" },
      { name: "TypeScript", color: "#3178C688" },
      { name: "Spring Boot", color: "#59c20b" },
      { name: "PostgreSQL", color: "#FFCA2888" },
      { name: "Docker", color: "#0b96c2" }
    ],
    githubUrl: "https://github.com/alpyxn/moviestar",
    gradientColors: "from-blue-600 to-purple-900"
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
      { name: "Spring Boot", color: "#59c20b" },
      { name: "PostgreSQL", color: "#FFCA2888" },
      { name: "Docker", color: "#0b96c2" },
    ],
    githubUrl: "https://github.com/alpyxn/minustodo",
    gradientColors: "from-green-600 to-blue-800"
  },
  
];

export default function Projects() {
  const [selectedCategory] = useState("All");
  
  const filteredProjects = projectsData.filter(project => 
    selectedCategory === "All" || project.technologies.some(tech => tech.name === selectedCategory)
  );

  return (
    <div className="min-h-screen pt-16 sm:pt-20 mt-10 px-3 sm:px-6 pb-10 sm:pb-16">
      <div className="max-w-6xl mx-auto mb-6 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            See My Work
          </span>
        </h1>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto text-center py-10">
          <svg className="w-12 h-12 mx-auto text-blue-300/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg sm:text-xl text-white mb-2">No projects found</h3>
          <p className="text-blue-200 text-sm">Try selecting a different filter</p>
        </div>
      )}

      <div className="mt-12 sm:mt-16 max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-white/10 text-center shadow-lg shadow-blue-900/10">
        <svg 
          className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-white mb-4" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">Want to see more?</h2>
        <p className="text-blue-200/90 text-sm sm:text-base mb-5">Check out my GitHub profile for additional projects and contributions</p>
        
        <a
          href="https://github.com/alpyxn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Visit My GitHub Profile
        </a>
      </div>
    </div>
  );
}
