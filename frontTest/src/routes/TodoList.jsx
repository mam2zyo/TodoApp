// src/routes/TodoList.jsx
import { Link } from "react-router-dom";
import TodoItem from "../components/TodoItem";
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
  incompleteCount,
}) {
  // 완료된 항목을 필터링하거나 그대로 보여줍니다.
  const filteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.completed);

  return (
    <div className="todolist-container">
      <div className="header">
        {/* 이 부분이 전체 할 일 개수를 표시하는 부분입니다. */}
        <div className="todo-counts">
          <h2>전체 할 일: {totalCount}개</h2>
          <h3>미완료 할 일: {incompleteCount}개</h3>
        </div>
        <div className="actions">
          <button
            onClick={onToggleShowCompleted}
            className="btn-toggle-completed"
          >
            {showCompleted ? "완료된 항목 숨기기" : "완료된 항목 보이기"}
          </button>
          <Link to="/todos/new">
            <button className="btn-add">새 할 일 추가</button>
          </Link>
        </div>
      </div>

      {filteredTodos.length > 0 ? (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : (
        <p className="no-todos-message">표시할 할 일이 없습니다.</p>
      )}

      {!isLastPage && (
        <button onClick={handleLoadMore} className="btn-load-more">
          더 보기
        </button>
      )}
    </div>
  );
}

export default TodoList;
