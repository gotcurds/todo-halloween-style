import React, { useState } from 'react'; 
import './styles/Todo.css';
import './styles/App.css';

function App() {
    
    
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');

  
    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      if (newTodo.trim() === '') return;

      const newTodoItem = {
          id: Date.now(),
          text: newTodo,
          completed: false
      };
      setTodos(prevTodos => [...prevTodos, newTodoItem]);
      setNewTodo('');
    };

    const toggleTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
              todo.id === id ?
              { ...todo, completed: !todo.completed }
              : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };
    return (
        <div>
            <h1 className="logo">My Simple To-do List</h1>
             
            <form className="input-bar" onSubmit={handleSubmit}>
                <input
                    className='todo-input'
                    type="text"
                    
                    value={newTodo} 
                    
                    onChange={handleInputChange} 
                    
                    placeholder="Add a new todo..."
                />
                <button className="add" type="submit">Add To-do</button>

              <div className="category-card">
                <button onClick={() => setFilter('all')}
                className={filter === 'all' ? 'active-filter' : ''}
                >
                  All
                </button>

                <button onClick={() => setFilter('active')}
                className={filter === 'active' ? 'active-filter' : ''}
                >
                  Active
                </button>

                <button onClick={() => setFilter('completed')}
                className={filter === 'completed' ? 'active-filter' : ''}
                >
                  Completed 
                  </button>
              </div>
            <ul>
              {todos 
              .filter(todo => {
                  if (filter === 'active') { return !todo.completed;}
                  if (filter === 'completed') {return todo.completed;}return true; })
                .map(todo => (
                    <li key ={todo.id} className={todo.completed ? 'completed' : 'todo-item'}>
                      <span onClick={() => toggleTodo(todo.id)}>
                        {todo.text}
                      </span><br />
                      <button className="delete" onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </button>
                    </li>
                ))}
            </ul>
          </form>
            
        </div>
    );
}


export default App;
