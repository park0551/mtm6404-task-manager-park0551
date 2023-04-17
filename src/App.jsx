import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import CompletedList from './components/CompletedList';
import Greeting from './components/Greeting';
import NewListForm from './components/NewListForm';
import ListNavigation from './components/ListNavigation';
import ListDisplay from './components/ListDisplay';
import { ListContext } from './contexts/ListContext';

import './App.css';


function App() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [showCompletedList, setShowCompletedList] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);


  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists') || '[]');
    setLists(storedLists);
  }, []);

  const handleAddList = (newList) => {
    const newListWithId = { ...newList, id: lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 1 };
    const updatedLists = [...lists, newListWithId];
    setLists(updatedLists);
    setNewListName('');
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  };

  const handleRemoveItem = (listId, itemId) => {
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.filter(item => item.id !== itemId);
        return { ...list, items: updatedItems };
      }
      return list;
    });
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  };

  const handleAddItem = (newItem) => {
    const updatedLists = lists.map(list => {
      if (list === selectedList) {
        return {
          ...list,
          items: [...list.items, newItem]
        };
      }
      return list;
    });
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  };

  const handleListSelect = (list) => {
    setSelectedListId(list.id);
    setShowCompletedList(false);
  };

  const handleListDelete = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);
    setLists(updatedLists);
  
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  
    if (selectedList && selectedList.id === listId) {
      // if selected list is deleted, select first list in the updated list of lists
      setSelectedList(updatedLists.length ? updatedLists[0] : null);
    }
  };
  
  

  return (
    <ListContext.Provider value={{ lists, selectedListId, handleListSelect }}>
      <div className="appDiv">
        <Navigation />
        <Greeting name="Taylor">
          <h2 className="h2">What's on today's agenda?</h2>
        </Greeting>
        {selectedListId ? (
          <ListDisplay list={lists.find(list => list.id === selectedListId)} />
        ) : (
          <>
            <TodoList items={selectedList ? selectedList.items : []} onRemove={handleRemoveItem} handleAddItem={handleAddItem} />
            <NewListForm onAddList={handleAddList} newListName={newListName} setNewListName={setNewListName} />
            <ListNavigation lists={lists} onListSelect={handleListSelect} onListDelete={handleListDelete}/>
          </>
        )}
      </div>
    </ListContext.Provider>
  );
  
}

export default App;
