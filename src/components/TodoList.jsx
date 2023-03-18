import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
  const { onRemove } = props;
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('low');
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('todoItems'));
    console.log('savedItems from localStorage:', savedItems); // Debug statement
    if (Array.isArray(savedItems)) {
      setItems(savedItems);
      setLoadedFromStorage(true);
    }
  }, []);

  useEffect(() => {
    if (loadedFromStorage) {
      console.log('Saving items to localStorage:', items); // Debug statement
      localStorage.setItem('todoItems', JSON.stringify(items));
    }
  }, [items, loadedFromStorage]);

  const handleInputChange = (event) => {
    setNewItemText(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewItemPriority(event.target.value);
  };

  const handleAddItemClick = () => {
    const newId = items.length === 0 ? 1 : Math.max(...items.map(item => item.id)) + 1;
    const newItem = { id: newId, text: newItemText, priority: newItemPriority };
    setItems([...items, newItem]);
    setNewItemText('');
    setNewItemPriority('low');
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };

  return (
    <div className='todoList'>
      <h3>To-Do:</h3>

      {items.length === 0 ?
        (<p>No items yet.</p>):
        (<ul className='to-do-ul'>
          {items.map((item) => (
            <TodoItem key={item.id} text={item.text} priority={item.priority} onRemove={() => handleRemoveItem(item.id)}>
            </TodoItem>
          ))}
        </ul>
      )}

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

export default TodoList;
