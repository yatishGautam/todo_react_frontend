import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TodoItem from './TodoItem'
import './App.css'




function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log('here')
    async function fetchTodoList() {
      try {
        const response = await fetch('http://localhost:3000/todo');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTodoList();
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>
            <TodoItem 
              id={todo._id}
              title={todo.title}
              description={todo.description}
              isChecked={todo.completed} // Assuming isChecked is true if the todo is completed
              addedTime={todo.addedTime}
              completedTime={todo.completedTime}
            >

            </TodoItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
