import React, { useState } from 'react';
import './ModalList.css';

interface ModalListProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateList: (listName: string) => void;
}

const ModalList: React.FC<ModalListProps> = ({ isOpen, onClose, onCreateList }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateList(listName);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Create New List</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="listName">List Name:</label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ModalList;
