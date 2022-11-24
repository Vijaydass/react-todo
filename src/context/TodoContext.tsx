import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { FilterOptions, Todo } from "../types";

export type TodoState = {
  todos: Todo[];
  currentFileter: FilterOptions;
};

export enum TodoActionType {
  Get,
  Create,
  Update,
  Delete,
  Filter,
}

interface GetTodo {
  type: TodoActionType.Get;
}

interface CreateTodo {
  type: TodoActionType.Create;
  payload: Todo;
}
interface UpdateTodo {
  type: TodoActionType.Update;
  payload: Partial<Todo>;
}
interface DeleteTodo {
  type: TodoActionType.Delete;
  payload: number;
}
interface FilterTodo {
  type: TodoActionType.Filter;
  payload: FilterOptions;
}

type TodoAction = GetTodo | CreateTodo | UpdateTodo | DeleteTodo | FilterTodo;

const getLocalTodos = () => {
  const exists = localStorage.getItem("todos");

  return exists ? (JSON.parse(exists) as Todo[]) : ([] as Todo[]);
};

const initialState: TodoState = {
  todos: getLocalTodos(),
  currentFileter: FilterOptions.ALL,
};

const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionType.Get:
      return {
        ...state,
        todos: localStorage.getItem("todos")
          ? JSON.parse(localStorage.getItem("todos") as string)
          : [],
      };
    case TodoActionType.Create:
      console.log("payload", action.payload);
      const todos = [...state.todos, action.payload];
      localStorage.setItem("todos", JSON.stringify(todos));
      return {
        ...state,
        todos,
      };
    case TodoActionType.Update:
      const updatedTodoList = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodoList));
      return {
        ...state,
        todos: updatedTodoList,
      };
    case TodoActionType.Delete:
      const todolist = state.todos.filter(({ id }) => id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(todolist));
      return {
        ...state,
        todos: todolist,
      };
    case TodoActionType.Filter:
      return {
        ...state,
        currentFileter: action.payload,
      };
    default:
      return state;
  }
};

const TodoContext = createContext<{
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);

export default TodoProvider;
