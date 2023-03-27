import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
  const { onRemove } = props;
  const [items, setItems] = useState([]);
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

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };

  return (
    <div className='todoList'>
      <h3>Completed:</h3>

      {items.length === 0 ?
        (<p>No items yet.</p>):
        (<ul className='to-do-ul'>
          {items.map((item) => (
            <TodoItem key={item.id} text={item.text} priority={item.priority} onRemove={() => handleRemoveItem(item.id)}>
            </TodoItem>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
