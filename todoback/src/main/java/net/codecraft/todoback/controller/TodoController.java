package net.codecraft.todoback.controller;

import lombok.RequiredArgsConstructor;
import net.codecraft.todoback.dto.TodoRequest;
import net.codecraft.todoback.dto.TodoResponse;
import net.codecraft.todoback.service.TodoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {
	
//	kjghkjaghiahg

    private final TodoService todoService;

    @GetMapping("/todos")
    public ResponseEntity<Page<TodoResponse>> findAllTodos(
            @PageableDefault(size = 5, sort = "id")Pageable pageable) {
        Page<TodoResponse> todosPage = todoService.findAll(pageable);
        return ResponseEntity.ok(todosPage);
    }

    @PostMapping("/todos")
    public ResponseEntity<TodoResponse> addTodo(@RequestBody TodoRequest request) {
        TodoResponse created = todoService.createTodo(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<TodoResponse> updateTodo(
            @PathVariable long id,
            @RequestBody TodoRequest request) {
        TodoResponse updated = todoService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable long id) {
        todoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
