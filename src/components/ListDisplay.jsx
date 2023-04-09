import React from 'react';
import TodoItem from './TodoItem';

function ListDisplay(props) {
  const { list } = props;

  if (!list) {
    return <div>Please select a list from the navigation.</div>;
  }

  const { id, name, items } = list;

  return (
    <div className="list-display">
      <h2>{name}</h2>
      <ul>
        {items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            priority={item.priority}
            completed={item.completed}
            onRemove={() => console.log('Remove item')}
            onCompleted={() => console.log('Complete item')}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListDisplay;
