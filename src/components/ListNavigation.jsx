import React from 'react';


function ListNavigation({ lists, onListSelect }) {
  const handleListSelect = (list) => {
    onListSelect(list);
  };

  return (
    <nav>
      <ul className='listNav'>
        {lists.map(list => (
          <li key={list.id} onClick={() => handleListSelect(list)}><a> 
            {list.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ListNavigation;
