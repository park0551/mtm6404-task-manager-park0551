import { useState } from 'react';
import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import Greeting from './components/Greeting';
import './App.css';

function App() {
  
  const [items, setItems] = useState([]);

  const handleRemoveItem = (id) => {
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
      <TodoList items={items} onRemove={handleRemoveItem} handleAddItem={handleAddItem}/>
    </div>
  );

}

export default App;

