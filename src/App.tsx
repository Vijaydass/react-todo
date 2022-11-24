import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import Heading from "./components/Heading";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <header>
            <Heading />
            <AddTodo />
          </header>
          <Filters />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
