import TodoList from './TodoList.jsx';
import './App.css';
import { useState, useRef } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const userName = useRef();
  const handleAddTask = () => {
    const name = userName.current.value;
    if(name === " ") return;
    setTodos((prevtodos) => {
      return [...prevtodos, {id : uuidv4(), name : name, completed : false}];
    });
    userName.current.value = null;
  }

  const handleDelTask = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }
  
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };
  return (
    <div>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      <input type = "text" ref = {userName}/>
      <button onClick = {handleAddTask}>タスクを追加</button><br></br>
      <button onClick = {handleDelTask}>完了したタスクの削除</button>
      <div>残りのタスク : {todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
