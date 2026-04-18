import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function AppContent() {
  const [notes, setNotes] = useState(() => {
    // Initial state from localStorage to fulfill requirement: Reload trang không mất dữ liệu -> useEffect + localStorage
    const savedNotes = localStorage.getItem('personal_notes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '1', text: 'Học useState để quản lý state trong component', time: '17/04/2026, 20:00', icon: '📚' },
      { id: '2', text: 'Tìm hiểu useEffect xử lý side effects', time: '17/04/2026, 20:05', icon: '💡' },
      { id: '3', text: 'Thực hành Context API chia sẻ dữ liệu', time: '17/04/2026, 20:10', icon: '🔗' },
      { id: '4', text: 'Thêm chức năng Dark / Light mode', time: '17/04/2026, 20:15', icon: '🌙' },
      { id: '5', text: 'Lưu dữ liệu vào localStorage bằng useEffect', time: '17/04/2026, 20:20', icon: '💾' }
    ];
  });
  
  // Update localStorage when notes change
  useEffect(() => {
    localStorage.setItem('personal_notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (text) => {
    // Icons for visual variety
    const icons = ['📚', '💡', '🚀', '🛠️', '🎨', '🧩', '⚡', '📌', '✨'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    // Format current date/time
    const now = new Date();
    const timeString = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newNote = {
      id: Date.now().toString(),
      text: text.trim(),
      time: timeString,
      icon: randomIcon
    };

    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app-container">
      <Header noteCount={notes.length} />
      
      <main className="app-main">
        <NoteForm onAddNote={handleAddNote} />
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
