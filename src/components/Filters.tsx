import React from "react";
import { TodoActionType, useTodo } from "../context/TodoContext";
import { FilterOptions } from "../types";

const Filters = () => {
  const {
    state: { currentFileter },
    dispatch,
  } = useTodo();

  const filterTodo = (filter: FilterOptions) => {
    dispatch({
      type: TodoActionType.Filter,
      payload: filter,
    });
  };

  return (
    <div className="filters" style={{textAlign: 'center'}}>
      <li 
        className={`filter ${
          currentFileter === FilterOptions.ALL && "selectedFilter"
        }`}
        onClick={() => filterTodo(FilterOptions.ALL)}
      >
        All
      </li>
      <li
        className={`filter ${
          currentFileter === FilterOptions.COMPLETED && "selectedFilter"
        }`}
        onClick={() => filterTodo(FilterOptions.COMPLETED)}
      >
        Completed
      </li>
      <li
        className={`filter ${
          currentFileter === FilterOptions.PENDING && "selectedFilter"
        }`}
        onClick={() => filterTodo(FilterOptions.PENDING)}
      >
        Pending
      </li>
    </div>
  );
};

export default Filters;
