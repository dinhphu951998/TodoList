import React from 'react';
import { Item } from './components/Item';
import { ItemList } from './components/ItemList';

import './App.css';
import { IItem } from './types/IItem';


const defaultValue: IItem[] = [
  {
    name: 'Complete website',
    completed: true
  }, {
    name: 'Go to sleep',

  }
]

function App() {
  console.log('reload <App>')
  return (
    <div className='container'>
      <ItemList items={defaultValue} />
    </div>
  );
}

export default App;
