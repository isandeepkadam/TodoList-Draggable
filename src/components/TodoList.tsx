import { FunctionComponent } from "react";
import { useDrop } from "react-dnd";
import { ItemId, SingleTodoList, Todo } from ".";
import "./styles.css";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
}

const TodoList: FunctionComponent<Props> = ({
  todos,
  setTodos,
  completedTodos,
}) => {
  const [{ isOver }, dropTodoComplete] = useDrop(() => ({
    accept: ItemId,
    drop(item: { tid: Number }) {
      setTodos((todos) =>
        todos.map((t) => (t.id == item.tid ? { ...t, isDone: true } : t))
      );
    },
    collect(monitor) {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  }));

  const [{ isOverActive }, dropTodoActive] = useDrop(() => ({
    accept: "todoActive",
    drop(item: { tid: Number }) {
      setTodos((todos) =>
        todos.map((t) => (t.id == item.tid ? { ...t, isDone: false } : t))
      );
    },
    collect(monitor) {
      return {
        isOverActive: !!monitor.isOver(),
      };
    },
  }));
  return (
    <div className="container">
      <div ref={dropTodoActive}>
        <ul className="todos__heading">Active Tasks</ul>
        {todos.map((todo) => (
          <li style={{ display: todo.isDone ? "none" : "block" }} key={todo.id}>
            <SingleTodoList todo={todo} dropType={ItemId} setTodos={setTodos} />
          </li>
        ))}
      </div>
      <div ref={dropTodoComplete}>
        <span className="todos__heading">Completed Tasks</span>
        {completedTodos.map((todo) => (
          <SingleTodoList
            todo={todo}
            dropType="todoActive"
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
