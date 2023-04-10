import React, { useState } from 'react';

function NewListForm(props) {
  const [newListName, setNewListName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newList = { name: newListName, items: [] };
    props.onAddList(newList);
    setNewListName('');
    props.setFormVisible(false);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newListName} onChange={(event) => setNewListName(event.target.value)} placeholder="Enter list name" />
      <button type="submit">Add List</button>
    </form>
  );
}

export default NewListForm;
