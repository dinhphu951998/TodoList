import React from 'react';
import { ItemList } from './components/ItemList';

import './App.css';
import { ItemListProvider } from './context/TodoListContext'


function App() {
  return (
    <ItemListProvider>
      <div className='container'>
        <ItemList />
      </div>
    </ItemListProvider>
  );
}

export default App;
