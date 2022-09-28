import { FunctionComponent, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { InputField, Todo, TodoList } from "./components";

const App: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const completedTodos = useMemo(() => todos.filter((t) => t.isDone), [todos]);

  return (
    <div className="App">
      <span className="heading">Manage your Tasks</span>
      <InputField setTodos={setTodos} />
      <DndProvider backend={HTML5Backend}>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          // setCompletedTodos={setCompletedTodos}
        />
      </DndProvider>
    </div>
  );
};

export default App;
