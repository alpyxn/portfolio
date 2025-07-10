import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  active: boolean;
}

const NavItem = ({ to, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={`
      group relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-lg overflow-hidden
      ${active 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-500/20' 
        : 'text-gray-700 hover:text-gray-800 hover:bg-gray-50 hover:shadow-sm'}
    `}
  >
    {/* Subtle shimmer effect for non-active items */}
    {!active && (
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
    )}
    
    {/* Clean active indicator */}
    {active && (
      <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"></span>
    )}
    
    <span className="relative z-10 font-medium">{label}</span>
  </Link>
);

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/97 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-20 px-4">
          {/* Centered Navigation Links */}
          <div className="flex items-center space-x-3">
            <NavItem to="/" label="Home" active={location.pathname === '/'} />
            <NavItem to="/techstack" label="Tech Stack" active={location.pathname === '/techstack'} /> 
            <NavItem to="/work" label="Projects" active={location.pathname === '/work'} />
            <NavItem to="/books" label="The Books" active={location.pathname === '/books'} />
          </div>
        </div>
      </div>
    </nav>
  );
};
