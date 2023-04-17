import React, { useState } from 'react';

function NewListForm(props) {
  const { onAddList, setNewListName, newListName } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newList = {
      name: newListName,
      items: []
    };
    onAddList(newList);
    setNewListName('');
  };

  return (
    <form onSubmit={handleSubmit} className='new-list-form'>
      <input className='new-list-input-box' type="text" value={newListName} onChange={(event) => setNewListName(event.target.value)} placeholder="Add a new list..." />
      <button type="submit">Add List</button>
    </form>
  );
}

export default NewListForm;
