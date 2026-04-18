const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="note-item">
      <div className="note-content">
        <span className="note-text">
          <span style={{marginRight: '8px'}}>{note.icon || '📌'}</span>
          {note.text}
        </span>
        <span className="note-time">{note.time}</span>
      </div>
      <button className="btn-delete" onClick={() => onDelete(note.id)}>
        Xóa
      </button>
    </div>
  );
};

export default NoteItem;
