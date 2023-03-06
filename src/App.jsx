import { useState } from 'react';
import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import Greeting from './components/Greeting';
import './App.css';

function App() {
  
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 2, text: "Item 4" },
    { id: 3, text: "Item 5" }
  ]);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  }

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="appDiv">
      <Navigation />
      <Greeting name="Taylor"> 
      <h2>What's on today's agenda?</h2>
      </Greeting>
      <TodoList items={items} onRemove={removeItem} handleAddItem={handleAddItem}/>
    </div>
  );

}

export default App;

