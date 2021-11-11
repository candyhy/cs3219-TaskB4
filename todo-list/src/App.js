import React, { useState, useEffect } from 'react';
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = require('./api');

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.taskname}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="taskname" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = taskname => {
    api.createTask(taskname, false);
    
    const newTodos = [...todos, {
      taskname: taskname,
      isDone: false
    }];
    setTodos(newTodos);
  };

  useEffect( () => {
    setTodos([{
      taskname: "Sample Todo",
      isDone: false
    }]);
    api.getTasks().then((taskList) => {
      if (taskList) {
          return setTodos(taskList);
      }
    });
  }, []);

  const markTodo = index => {
    const newTodos = [...todos];
    const task = newTodos[index];
    task.isDone = true;
    api.updateTask(task.taskname, true);
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    const task = newTodos[index];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    api.deleteTask(task.taskname);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={todo.taskname}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;