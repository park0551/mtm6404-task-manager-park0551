import { useState } from 'react';
import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import CompletedList from './components/CompletedList';
import Greeting from './components/Greeting';
import NewListForm from './components/NewListForm';
import ListNavigation from './components/ListNavigation';
import ListDisplay from './components/ListDisplay';
import './App.css';

function App() {

  const [lists, setLists] = useState([]);

  const [selectedList, setSelectedList] = useState(null);

  const handleAddList = (newList) => {
    const newId = lists.length > 0 ? Math.max(...lists.map((list) => list.id)) + 1 : 1;
    const newListWithId = { ...newList, id: newId };
    setLists([...lists, newListWithId]);
  };
  
  
  const [items, setItems] = useState([]);

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="appDiv">
      <Navigation />
      <Greeting name="Taylor"> 
      <h2 className='h2'>What's on today's agenda?</h2>
      </Greeting>
      <TodoList items={items} onRemove={handleRemoveItem} handleAddItem={handleAddItem}/>
      <CompletedList />
      <NewListForm onAddList={handleAddList} />
      <ListNavigation lists={lists} onListSelect={setSelectedList} />
      {selectedList ? (
        <ListDisplay list={selectedList} />
      ) : (
        <p>Please select a list from the navigation.</p>
      )}
    </div>
  );

}

export default App;

