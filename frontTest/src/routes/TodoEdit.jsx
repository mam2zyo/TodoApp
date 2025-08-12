import { useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import "./TodoFormPage.css";

function TodoEdit({ todos, onUpdate }) {
  const { id } = useParams();
  const todoId = parseInt(id, 10);

  const todoToEdit = todos.find((todo) => todo.id === todoId);

  return (
    <div>
      <h1>할 일 수정</h1>
      <TodoForm initialData={todoToEdit} onSubmit={onUpdate} />
    </div>
  );
}

export default TodoEdit;
