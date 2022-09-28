import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from ".";
import "./styles.css";

type Props = {
  todo: Todo;
  dropType: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodoList: FunctionComponent<Props> = ({
  dropType,
  todo,
  setTodos,
}) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) =>
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );

  const handleDelete = (id: number) =>
    setTodos((todos) => todos.filter((todo) => todo.id !== id));

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (inputRef.current) {
      const todoText = inputRef.current.value;
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: todoText } : todo
        )
      );
      setEdit(false);
    }
  };

  useEffect(() => inputRef.current?.focus(), [edit]);

  console.log("dropType", dropType);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dropType,
    item: { tid: todo.id },
    collect(monitor) {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  return (
    <form
      className={`todo__single ${isDragging ? "drag" : ""}`}
      onSubmit={(e) => handleEdit(e, todo.id)}
      ref={drag}
    >
      {edit ? (
        <input
          ref={inputRef}
          className="todos__single--text"
          defaultValue={todo.todo}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodoList;
