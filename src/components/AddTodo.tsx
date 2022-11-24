import React, { useState } from "react";
import { TodoActionType, useTodo } from "../context/TodoContext";

const AddTodo = () => {
  const [text, setText] = useState<string>("");
  const { state, dispatch } = useTodo();
  const createTodo = (text: string) => {
    dispatch({
      type: TodoActionType.Create,
      payload: {
        id: state.todos.length + 1,
        text: text,
        done: false,
      },
    });
  };
  return (
    <form onSubmit={() => createTodo(text)} style={{display: 'inline-flex',
      width: '100%'}}>
      <input
        type={"text"}
        className="form-control add-todo"
        style={{marginRight:'5px'}}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="button-22" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
