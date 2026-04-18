import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ noteCount }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <div className="app-title">
        <span className="icon-note">📝</span>
        Ghi Chú Cá Nhân
      </div>
      <div className="header-actions">
        <span className="note-count">{noteCount} ghi chú</span>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
