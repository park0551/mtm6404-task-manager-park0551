import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function ListDisplay({ list }) {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('low');
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  useEffect(() => {
    setItems(list.items);
  }, [list.items]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(`todoItems_${list.id}`));
    if (Array.isArray(savedItems)) {
      setItems(savedItems);
      setLoadedFromStorage(true);
    }
  }, [list.id]);

  useEffect(() => {
    if (loadedFromStorage) {
      localStorage.setItem(`todoItems_${list.id}`, JSON.stringify(items));
    }
  }, [items, loadedFromStorage, list.id]);

  const handleInputChange = (event) => {
    setNewItemText(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewItemPriority(event.target.value);
  };

  const handleAddItemClick = () => {
    const newId = items.length === 0 ? 1 : Math.max(...items.map(item => item.id)) + 1;
    const newItem = { id: newId, text: newItemText, priority: newItemPriority, completed: false };
    setItems([...items, newItem]);
    setNewItemText('');
    setNewItemPriority('low');
    localStorage.setItem(`todoItems_${list.id}`, JSON.stringify([...items, newItem]));

  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem(`todoItems_${list.id}`, JSON.stringify(updatedItems));
  };

  const handleCompletedItem = (item) => {
    const updatedItems = items.map((currItem) => {
      if (currItem.id === item.id) {
        return { ...currItem, completed: !currItem.completed };
      }
      return currItem;
    });
    setItems(updatedItems);
    localStorage.setItem(`todoItems_${list.id}`, JSON.stringify(updatedItems));
  };

  return (
    <div className='todoList'>
      <h2>{list.name}:</h2>
      <ul>
        {items.map(item => (
          <TodoItem key={item.id} text={item.text} priority={item.priority} completed={item.completed} onRemove={() => handleRemoveItem(item.id)} onCompleted={() => handleCompletedItem(item)} />
        ))}
      </ul>
      <div className="new-item">
        <input className="input-box" type="text" value={newItemText} placeholder="Start typing..." onChange={handleInputChange} />
        <select className="priority-select" value={newItemPriority} onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <button className="newItemBtn" onClick={handleAddItemClick}>+</button>
      </div>
    </div>
  );
}

export default ListDisplay;
