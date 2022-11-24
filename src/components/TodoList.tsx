import { useTodo } from "../context/TodoContext";
import { FilterOptions, Todo } from "../types";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const {
    state: { todos, currentFileter },
  } = useTodo();

  const filteredTodos =
    currentFileter === FilterOptions.ALL
      ? todos
      : todos.filter(({ done }) =>
          currentFileter === FilterOptions.COMPLETED ? done : !done
        );
  return (
    <ul className="list-unstyled">
      {filteredTodos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
