import React from 'react';
import { ItemList } from './components/ItemList';

import './App.css';
import { ItemListProvider } from './context/TodoListContext'


function App() {
  return (
    <div className='container'>
      <ItemList />
    </div>
  );
}

export default App;
