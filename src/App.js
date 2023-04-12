import React, { useState } from 'react';
import { nanoid } from "nanoid";
import logo from './tc-logo.svg'
import Movie from './components/Movie';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  'To Watch': (movie) => !movie.completed,
  Watched: (movie) => movie.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  const [movies, setMovies] = useState(props.movies);
  const [filter, setFilter] = useState('All');

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  function addMovie(name) {
    const newMovie = { id: `todo-${ nanoid() }`, name, completed: false };
    setMovies([...movies, newMovie]);
  }

  function editMovie(id, newName) {
    const editedMovieList = movies.map((movie) => {
      if (id === movie.id) {
        return{...movie, name: newName}
      }
      return movie;
    });
    setMovies(editedMovieList);
  }

  function deleteMovie(id) {
    const remainingMovies = movies.filter((movie) => id !== movie.id);
    setMovies(remainingMovies);
  }

  function toggleMovieCompleted(id) {
    const updatedMovies = movies.map((movie) => {
      if (id === movie.id) {
        return{...movie, completed: !movie.completed};
      }
      return movie;
    });
    setMovies(updatedMovies);
  }
  
  const movieList = movies
    .filter(FILTER_MAP[filter])
    .map((movie) => (
      <Movie 
        id={movie.id} 
        name={movie.name} 
        completed={movie.completed} 
        key={movie.id}
        toggleMovieCompleted={toggleMovieCompleted}
        deleteMovie={deleteMovie}
        editMovie={editMovie}
      />
  ));  

  return (
    <div className="todoapp stack-large">
      <header className="logo">
        <img src={logo} alt="logo" className="App-logo" />
      </header>
      <Form addMovie={addMovie} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
        >
        {movieList}
      </ul>
    </div>
  );
}

export default App;
