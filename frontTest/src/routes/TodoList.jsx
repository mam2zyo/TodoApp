import TodoItem from "../components/TodoItem";
import { Link } from "react-router-dom";
import "./TodoList.css";

function TodoList({
  todos,
  onDelete,
  onToggle,
  showCompleted,
  onToggleShowCompleted,
  handleLoadMore,
  isLastPage,
  totalCount,
}) {
  const fiteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h1>할 일 목록</h1>
      <div>
        <p>전체 할 일 개수: {totalCount}</p>
        <p>
          남아있는 할 일 개수: {todos.filter((todo) => !todo.completed).length}
        </p>
      </div>
      <div className="todo-controls">
        <Link to="/todos/new">
          <button className="btn-add">새 할 일 추가</button>
        </Link>
        <button
          className="btn-toggle-completed"
          onClick={onToggleShowCompleted}
        >
          {showCompleted ? "완료된 항목 숨기기" : "완료된 항목 보이기"}
        </button>
      </div>
      <ul>
        {fiteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>

      {!isLastPage && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="btn-load-more">
            더보기
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
