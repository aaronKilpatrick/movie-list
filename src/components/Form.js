import React, {useState} from 'react';

function Form(props) {
  const [name, setName] = useState('');

  // Handles change of textbox value
  function handleChange(e) {
    setName(e.target.value);
  }

  // Handles form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (name.length !== 0) {
      props.addMovie(name);
    }
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Add a movie
        </label>
      </h2>
      <input 
        type="text" 
        id="new-todo-input"
        className="input input_lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;