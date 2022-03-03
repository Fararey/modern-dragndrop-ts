import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';

const App: React.FC = () => {


  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos((prevState) => [...prevState, {id: Date.now(), todo,isDone:false}])
      setTodo("")
    }

  }

  const onDragEnd = (result:DropResult) => {
    const { source, destination} = result;

    console.log(result)

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    enum Lists {
      TodosList = 'TodosList',
      TodosRemove = "TodosRemove"
    }

    let draggedElement, 
      activeTodos = [...todos],
      completed = [...completedTodos] 

    if (source.droppableId === Lists.TodosList) {
      draggedElement = activeTodos[source.index]
      activeTodos.splice(source.index, 1)
    } else {
      draggedElement = completed[source.index]
      completed.splice(source.index, 1)
    }

    if (destination.droppableId === Lists.TodosList) {
      activeTodos.splice(destination.index, 0, draggedElement)
    } else {
      completed.splice(destination.index, 0, draggedElement)
    }

    setCompletedTodos(completed);
    setTodos(activeTodos)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
          <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList 
          todos={todos} 
          setTodos={setTodos} 
          completedTodos={completedTodos} 
          setCompletedTodos={setCompletedTodos}
      /> 
    </div>
    </DragDropContext>
  );
}

export default App;
