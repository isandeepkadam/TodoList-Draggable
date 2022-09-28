import { FunctionComponent, useRef } from "react";
import { Todo } from ".";
import "./styles.css";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const InputField: FunctionComponent<Props> = ({ setTodos }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current !== null) {
      const todo = inputRef.current.value;
      setTodos((todos) => [...todos, { id: Date.now(), todo, isDone: false }]);
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  };
  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        ref={inputRef}
        type="input"
        name="todoText"
        placeholder="Enter a task"
        className="input__box"
      ></input>
      <button className="input__submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
