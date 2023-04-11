import React, { useState, useEffect } from 'react';
import ListContext from './ListContext';

const ListContextProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists'));
    if (storedLists) {
      setLists(storedLists);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const addList = (list) => {
  console.log('check to see if addList is working');
  const newListWithId = { ...list, id: lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 1 };
  setLists((prevLists) => [...prevLists, newListWithId]);
};


  const updateList = (updatedList) => {
    const index = lists.findIndex((list) => list.id === updatedList.id);
    if (index !== -1) {
      const updatedLists = [...lists];
      updatedLists[index] = updatedList;
      setLists(updatedLists);
    }
  };

  const deleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
  };

  const contextValue = {
    lists,
    addList,
    updateList,
    deleteList,
  };

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
