import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../component/styles/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [showSidebar, setShowSidebar] = useState(isOpen);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showToggleButton, setShowToggleButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowToggleButton(true);
      } else if (window.scrollY > lastScrollY) {
        setShowSidebar(false);
        setShowToggleButton(false);
      } else {
        setShowToggleButton(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setShowSidebar(isOpen);
  }, [isOpen]);

  return (
    <div className={`sidebar-container ${showSidebar ? 'open' : ''}`}>
      {showToggleButton && (
        <button className="toggle-button" onClick={onClose}>
          {isOpen ? 'Close' : 'Open'}
        </button>
      )}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link className="sidebar-link" to="/character" onClick={onClose}>Characters</Link>
          </li>
          <li>
            <Link className="sidebar-link" to="/locations" onClick={onClose}>Locations</Link>
          </li>
          <li>
            <Link className="sidebar-link" to="/episodes" onClick={onClose}>Episodes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
