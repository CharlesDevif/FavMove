import React, { useState } from 'react';
import './ModalList.css';

interface ModalListProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateList: (listName: string, description: string) => void;
}

const ModalList: React.FC<ModalListProps> = ({ isOpen, onClose, onCreateList }) => {
  const [listName, setListName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateList(listName, description);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Créer une nouvelle liste</h2>
        <form onSubmit={handleSubmit}>
          <div id='containerForm'>
            <div className="divInputConteneur">
              <label htmlFor="listName">Nom de la liste</label>
              <input type="text" id="listName" name="name" value={listName} onChange={(e) => setListName(e.target.value)} required />
            </div>
            <div className="divInputConteneur">
              <label htmlFor="listDescription">Description de la liste</label>
              <input type="text" id="listDescription" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalList;
