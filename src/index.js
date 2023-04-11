import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
  { id: 'todo-0', name: 'Movie 1', completed: true },
  { id: 'todo-1', name: 'Movie 2', completed: false },
  { id: 'todo-2', name: 'Movie 3', completed: false },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App movies={DATA} />);

