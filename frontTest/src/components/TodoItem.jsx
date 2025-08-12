import { Link } from "react-router-dom";
import "./TodoItem.css";

function TodoItem({ todo, onDelete, onToggle }) {
  const itemClassName = `todo-item ${todo.completed ? "completd" : ""}`;

  return (
    <li className={itemClassName}>
      <div className="content-area">
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
      </div>
      <div className="button-group">
        <button className="btn-toggle" onClick={() => onToggle(todo.id)}>
          {todo.completed ? "✔️" : "◻️"}
        </button>
        <Link to={`/todos/${todo.id}/edit`}>
          <button className="btn-edit">✏️</button>
        </Link>
        <button className="btn-delete" onClick={() => onDelete(todo.id)}>
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
