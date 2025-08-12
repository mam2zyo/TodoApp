import { useState, useEffect } from "react";
import "./TodoForm.css";

function TodoForm({ initialData, onSubmit }) {
  const [todo, setTodo] = useState({ title: "", content: "" });

  useEffect(() => {
    if (initialData) {
      setTodo(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    onSubmit(todo);

    if (!initialData) {
      setTodo({ title: "", content: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={todo.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          value={todo.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />
      </div>
      <button type="submit" className="btn-submit">
        저장
      </button>
    </form>
  );
}

export default TodoForm;
