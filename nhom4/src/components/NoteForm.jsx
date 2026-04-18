import { useState } from 'react';

const NoteForm = ({ onAddNote }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    onAddNote(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="input-section">
      <input 
        type="text" 
        className="note-input"
        placeholder="Nhập ghi chú mới..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn-add" onClick={handleAdd}>
        + Thêm
      </button>
    </div>
  );
};

export default NoteForm;
