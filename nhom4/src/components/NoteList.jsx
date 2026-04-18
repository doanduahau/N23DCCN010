import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <div className="empty-state">Chưa có ghi chú nào. Hãy bắt đầu ghi chú!</div>
      ) : (
        notes.map(note => (
          <NoteItem key={note.id} note={note} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default NoteList;
