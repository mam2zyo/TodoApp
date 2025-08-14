import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import TodoList from "./routes/TodoList";
import TodoNew from "./routes/TodoNew";
import TodoEdit from "./routes/TodoEdit";

import "./App.css";
import "./routes/TodoList.css";
import "./routes/TodoFormPage.css";
import "./components/TodoItem.css";
import "./components/TodoForm.css";

// const API_URL = "/api/todos";
const API_URL = "http://localhost:8080/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const navigate = useNavigate();
  const PAGE_SIZE = 5;

  const fetchTodos = async (page) => {
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}&size=${PAGE_SIZE}`
      );
      const data = response.data;
      setTotalCount(data.totalElements);

      setTodos((prevTodos) =>
        page === 0 ? data.content : [...prevTodos, ...data.content]
      );

      setIsLastPage(data.last);
    } catch (error) {
      console.error("목록을 불러우는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchTodos(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchTodos(nextPage);
  };

  const handleAdd = async (newTodo) => {
    try {
      const response = await axios.post(API_URL, {
        title: newTodo.title,
        content: newTodo.content,
      });
      await fetchTodos(0);
      setCurrentPage(0);
      navigate("/todos");
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedTodo.id}`, {
        title: updatedTodo.title,
        content: updatedTodo.content,
        completed: updatedTodo.completed,
      });
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo))
      );
      navigate("todos");
    } catch (error) {
      console.error("할 일 수정 중 오류 발생:", error);
    }
  };

  // 테스트용 주석입니다
  const handleToggle = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) return;

    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        ...todoToToggle,
        completed: !todoToToggle.completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("할 일 상태 변경 중 오류 발생", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTodos(0);
      setCurrentPage(0);
    } catch (error) {
      console.error("할 일 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate replace to="/todos" />} />
        <Route
          path="/todos"
          element={
            <TodoList
              todos={todos}
              onDelete={handleDelete}
              onToggle={handleToggle}
              showCompleted={showCompleted}
              onToggleShowCompleted={() => setShowCompleted(!showCompleted)}
              handleLoadMore={handleLoadMore}
              isLastPage={isLastPage}
              totalCount={totalCount}
            />
          }
        />
        <Route path="/todos/new" element={<TodoNew onAdd={handleAdd} />} />
        <Route
          path="/todos/:id/edit"
          element={<TodoEdit todos={todos} onUpdate={handleUpdate} />}
        />
      </Routes>
    </div>
  );
}

export default App;
