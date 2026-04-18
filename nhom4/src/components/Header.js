"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-icon">📝</span>
        Ghi Chú Cá Nhân
      </div>
      <div className="header-actions">
        <div className="note-count">
          {noteCount} ghi chú
        </div>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
