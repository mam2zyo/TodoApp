// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import TodoList from "./routes/TodoList";
import TodoNew from "./routes/TodoNew";
import TodoEdit from "./routes/TodoEdit";

import "./App.css";
import "./routes/TodoList.css";
import "./routes/TodoFormPage.css";
import "./components/TodoItem.css";
import "./components/TodoForm.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const navigate = useNavigate();
  const PAGE_SIZE = 5;

  // 할 일 개수를 업데이트하는 헬퍼 함수
  const updateCounts = (allTodos) => {
    setTotalCount(allTodos.length);
    setIncompleteCount(allTodos.filter((todo) => !todo.completed).length);
  };

  const fetchTodos = (page) => {
    try {
      const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
      updateCounts(allTodos);

      const startIndex = page * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedTodos = allTodos.slice(startIndex, endIndex);

      setTotalCount(allTodos.length);
      setTodos((prevTodos) =>
        page === 0 ? paginatedTodos : [...prevTodos, ...paginatedTodos]
      );
      setIsLastPage(endIndex >= allTodos.length);
    } catch (error) {
      console.error("목록을 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (allTodos.length === 0) {
      // 초기 데이터가 없을 경우 예시 데이터 추가
      const initialTodos = [
        {
          id: 1,
          title: "리액트 공부하기",
          content: "useState 마스터하기",
          completed: false,
        },
        {
          id: 2,
          title: "저녁 장보기",
          content: "우유, 계란, 빵 사기",
          completed: true,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(initialTodos));
    }
    setCurrentPage(0);
    fetchTodos(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchTodos(nextPage);
  };

  const handleAdd = (newTodo) => {
    try {
      const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const todoToAdd = {
        ...newTodo,
        id: Date.now(),
        completed: false,
      };
      const updatedTodos = [...allTodos, todoToAdd];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      updateCounts(updatedTodos);

      setCurrentPage(0);
      fetchTodos(0);
      navigate("/todos");
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
    }
  };

  const handleUpdate = (updatedTodo) => {
    try {
      const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = allTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      updateCounts(updatedTodos);

      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      navigate("/todos");
    } catch (error) {
      console.error("할 일 수정 중 오류 발생:", error);
    }
  };

  const handleToggle = (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) return;

    try {
      const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = allTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      updateCounts(updatedTodos);

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("할 일 상태 변경 중 오류 발생", error);
    }
  };

  const handleDelete = (id) => {
    try {
      const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = allTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      updateCounts(updatedTodos);

      setTodos(todos.filter((todo) => todo.id !== id));
      setTotalCount(updatedTodos.length);
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
              incompleteCount={incompleteCount}
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
