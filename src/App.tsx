import React from 'react';
import { IItem, Item } from './components/Item';
import { ItemList } from './components/ItemList';

import './App.css';


const defaultValue: IItem[] = [
  {
    name: 'Complete website',
    completed: true
  }, {
    name: 'Go to sleep',

  }
]

function App() {
  return (
    <div className='container'>
      <ItemList items={defaultValue} />
    </div>
  );
}

export default App;
