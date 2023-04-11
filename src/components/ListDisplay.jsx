import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function ListDisplay({ list }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(list.items);
  }, [list]);

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div>
      <h2>{list.name}</h2>
      <ul>
        {items.map(item => (
          <TodoItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
        ))}
      </ul>
    </div>
  );
}

export default ListDisplay;
