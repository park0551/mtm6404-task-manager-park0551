import React, { useState } from 'react';
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

  const handleAddList = (newList) => {
    const newListWithId = { ...newList, id: lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 1 };
    setLists([...lists, newListWithId]);
    setNewListName('');
    localStorage.setItem('lists', JSON.stringify([...lists, newListWithId]));

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
  };

  const handleListSelect = (list) => {
    setSelectedList(list);
    setShowCompletedList(false);
  };

  return (
    <ListContext.Provider value={{ lists, selectedList, handleListSelect }}>
      <div className="appDiv">
        <Navigation />
        <Greeting name="Taylor">
          <h2 className="h2">What's on today's agenda?</h2>
        </Greeting>
        <TodoList items={selectedList ? selectedList.items : []} onRemove={handleRemoveItem} handleAddItem={handleAddItem} />
        <NewListForm onAddList={handleAddList} newListName={newListName} setNewListName={setNewListName} />
        <ListNavigation lists={lists} onListSelect={handleListSelect} />

        {selectedList ? (
          <ListDisplay list={selectedList} />
        ) : (
          <p>Please select a list from the navigation.</p>
        )}
      </div>
    </ListContext.Provider>
  );
}

export default App;
