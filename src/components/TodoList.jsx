import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
  const { items, onRemove, handleAddItem } = props;
  const [newItemText, setNewItemText] = useState('');

  const handleInputChange = (event) => {
    setNewItemText(event.target.value);
  };

  const handleAddItemClick = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    const newItem = { id: newId, text: newItemText };
    handleAddItem(newItem);
    setNewItemText('');
  };

  return (
    <div className='todoList'>
      <h3>To-Do:</h3>
      
      {props.items.length === 0 ?
      (<p>No items yet.</p>):
      (<ul className='to-do-ul'>
      {props.items.map((item) => (
        <TodoItem key={item.id} text={item.text}>
        <button className="remove-btn" onClick={() => onRemove(item.id)}>
          x
        </button>
      </TodoItem>
      ))}
    </ul>
    )}
      <div className="new-item">
      <input className="input-box" type="text" value={newItemText} placeholder="Start typing..." onChange={handleInputChange} />
      <button className="newItemBtn" onClick={handleAddItemClick}>+</button>
      </div>
    </div>
  );
}

export default TodoList;
