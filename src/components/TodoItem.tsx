import React, { FC, useState } from "react";
import { TodoActionType, useTodo } from "../context/TodoContext";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const [text, setText] = useState<string>(todo.text);
  const [editable, setEditable] = useState<boolean>(false);
  const { dispatch } = useTodo();

  const updateTodo = (todo: Partial<Todo>) => {
    dispatch({
      type: TodoActionType.Update,
      payload: todo,
    });
  };

  const deleteTodo = (id: number) => {
    dispatch({
      type: TodoActionType.Delete,
      payload: id,
    });
  };

  return (
    <li className="todo-item ui-state-default pending">
      <div className="checkbox">      
        <label>
        <input
          className="checkbox"
          type="checkbox"
          id={todo.id.toString()}
          defaultChecked={todo.done}
          onChange={() => updateTodo({ ...todo, done: !todo.done })}
        />
        {!editable ? (
          <label className="todo-label" htmlFor={todo.id.toString()}>
            {todo.text}
          </label>
        ) : (
          <input
            className="form-control"
            type={"text"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
        </label> 
        <div style={{float:'right'}}>
        {!editable ? (
          <button className="button-22" onClick={() => setEditable(true)}>
            Edit
          </button>
        ) : (
          <button
            className="button-22"
            onClick={() => {
              updateTodo({ ...todo, text });
              setEditable(false);
            }}
          >
            Update
          </button>
        )}
        <button className="button-22" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>      
        </div>  
      </div>
    </li>
  );
};

export default TodoItem;
