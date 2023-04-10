import React from 'react';

function ListNavigation({ lists, onListSelect }) {
  const handleListSelect = (list) => {
    onListSelect(list);
  };

  return (
    <nav>
      <ul>
        {lists &&
          lists.map((list) => (
            <li key={list.id} onClick={() => handleListSelect(list)}>
              {list.name}
            </li>
          ))}
        <li onClick={() => onListSelect(null)}>Todo</li>
      </ul>
    </nav>
  );
}

export default ListNavigation;

