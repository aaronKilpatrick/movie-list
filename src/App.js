import React, { useState } from 'react';
import { nanoid } from "nanoid";
import logo from './tc-logo.svg'
import Movie from './components/Movie';
import Form from './components/Form';
import FilterButton from './components/FilterButton';


function App(props) {
  const [movies, setMovies] = useState(props.movies);

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
  
  const movieList = movies.map((movie) => (
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
  const moviePlural = movieList.length !== 1 ? 'movies' : 'movie';
  const headingText = `${movieList.length} ${moviePlural} remaining`

  return (
    <div className="todoapp stack-large">
      <header className="logo">
        <img src={logo} alt="logo" className="App-logo" />
      </header>
      <Form addMovie={addMovie} />

      <div className="filters btn-group stack-exception">
        <FilterButton name="All"/>
        <FilterButton name="To Watch"/>
        <FilterButton name="Watched"/>
      </div>
      <h2 id="list-heading">{headingText}</h2>
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
