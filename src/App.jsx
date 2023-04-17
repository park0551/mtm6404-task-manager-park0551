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

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseApp = initializeApp( {
  apiKey: "AIzaSyCktLU7zybUhBcjGdwHMcQWJoiJnWEclzk",
  authDomain: "mtm6404-task-manager-park0551.firebaseapp.com",
  projectId: "mtm6404-task-manager-park0551",
  storageBucket: "mtm6404-task-manager-park0551.appspot.com",
  messagingSenderId: "649435750843",
  appId: "1:649435750843:web:0cb2a17a91ec97a04ce49e",
});

const firestore = getFirestore();
const db = getFirestore(firebaseApp);
console.log('Firestore is working');


function App() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [showCompletedList, setShowCompletedList] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const listsCollection = collection(db, "lists");
      const listsSnapshot = await getDocs(listsCollection);
      const listsData = listsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLists(listsData);
    };
    fetchData();
  }, []);

  const handleAddList = async (newList) => {
    const listsCollection = collection(db, "lists");
    const newListWithId = { ...newList, id: lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 1 };
    await addDoc(listsCollection, newListWithId);
    setNewListName('');
    setLists(prevLists => [...prevLists, newListWithId]);
  };
  

  const handleRemoveItem = async (listId, itemId) => {
    const listDoc = collection(db, "lists").doc(listId);
    const itemIndex = lists.findIndex((list) => list.id === listId);
    const updatedList = { ...lists[itemIndex] };
    updatedList.items = updatedList.items.filter((item) => item.id !== itemId);
    const updatedLists = [...lists];
    updatedLists[itemIndex] = updatedList;
    await updateDoc(listDoc, updatedList);
    setLists(updatedLists);
  };
  

  const handleAddItem = async (newItem) => {
    const listDoc = collection(db, "lists").doc(selectedList.id);
    const itemIndex = lists.findIndex((list) => list.id === selectedList.id);
    const updatedList = { ...lists[itemIndex] };
    updatedList.items = [...updatedList.items, newItem];
    const updatedLists = [...lists];
    updatedLists[itemIndex] = updatedList;
    await updateDoc(listDoc, updatedList);
    setLists(updatedLists);
  };

  const handleListSelect = (list) => {
    setSelectedListId(list.id);
    setShowCompletedList(false);
  };

  const handleListDelete = async (listId) => {
    try {
      await deleteDoc(doc(firestore, "lists", listId));
      const updatedLists = lists.filter(list => list.id !== listId);
      setLists(updatedLists);
    } catch (error) {
      console.error("Error removing list document: ", error);
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
            <ListNavigation lists={lists} onListSelect={handleListSelect} onListDelete={handleListDelete}/>
            <NewListForm onAddList={handleAddList} newListName={newListName} setNewListName={setNewListName} />
          </>
        )}
      </div>
    </ListContext.Provider>
  );
  
}

export default App;
