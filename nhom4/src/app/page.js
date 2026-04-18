"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const DEFAULT_NOTES = [
  { id: 1, text: 'Học useState để quản lý state trong component', icon: '📚', date: '17/04/2026, 20:00' },
  { id: 2, text: 'Tìm hiểu useEffect xử lý side effects', icon: '⚡', date: '17/04/2026, 20:05' },
  { id: 3, text: 'Thực hành Context API chia sẻ dữ liệu', icon: '🔗', date: '17/04/2026, 20:10' },
  { id: 4, text: 'Thêm chức năng Dark / Light mode', icon: '🌙', date: '17/04/2026, 20:15' },
  { id: 5, text: 'Lưu dữ liệu vào localStorage bằng useEffect', icon: '💾', date: '17/04/2026, 20:20' }
];

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedNotes = localStorage.getItem("personal_notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes from localStorage");
        setNotes(DEFAULT_NOTES);
      }
    } else {
      setNotes(DEFAULT_NOTES);
    }
  }, []);

  // Save to localStorage when notes change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("personal_notes", JSON.stringify(notes));
    }
  }, [notes, isMounted]);

  const addNote = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Get current date formatted like the example
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Pick a random icon for fun
    const icons = ['📌', '✍️', '💡', '📝', '✨', '🚀'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const newNote = {
      id: Date.now(),
      text: inputValue.trim(),
      icon: randomIcon,
      date: formattedDate
    };

    setNotes([newNote, ...notes]);
    setInputValue("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  if (!isMounted) {
    return null; // Don't render until client side code runs to prevent hydration mismatches
  }

  return (
    <>
      <Header noteCount={notes.length} />
      <main className="main-content">
        <form className="add-note-form" onSubmit={addNote}>
          <input 
            type="text" 
            className="note-input"
            placeholder="Nhập ghi chú mới..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-button">
            + Thêm
          </button>
        </form>

        <div className="note-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              Bạn chưa có ghi chú nào. Hãy tạo một ghi chú mới!
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-content">
                  <div className="note-text">
                    <span className="note-icon">{note.icon}</span>
                    {note.text}
                  </div>
                  <div className="note-time">{note.date}</div>
                </div>
                <button onClick={() => deleteNote(note.id)} className="delete-btn">
                  Xóa
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
