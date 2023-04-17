import React from 'react';

function ListNavigation({ lists, selectedListId, onListSelect, onListDelete }) {
  const handleListSelect = (list) => {
    onListSelect(list);
  };

  const handleListDelete = (event, listId) => {
    event.stopPropagation(); // prevent selecting the list when delete btn is clicked
    onListDelete(listId);
  }

  return (
    <nav>
      <ul className='listNav'>
        {lists.map(list => (
          <li key={list.id} onClick={() => handleListSelect(list)} className={selectedListId === list.id ? 'selected' : ''}>
            <a>{list.name}</a>
            <button className='remove-btn' onClick={(event) => handleListDelete(event, list.id)}><i className="fas fa-trash-alt"></i></button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ListNavigation;
