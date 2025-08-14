package net.codecraft.todoback.service;

import lombok.RequiredArgsConstructor;
import net.codecraft.todoback.domain.Todo;
import net.codecraft.todoback.dto.TodoRequest;
import net.codecraft.todoback.dto.TodoResponse;
import net.codecraft.todoback.repository.TodoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    @Transactional(readOnly = true)
    public Page<TodoResponse> findAll(Pageable pageable) {
        Page<Todo> todosPage = todoRepository.findAll(pageable);
        return todosPage.map(TodoResponse::new);
    }

    @Transactional
    public TodoResponse createTodo(TodoRequest request) {
        if(request.isCompleted()) {
           throw new IllegalArgumentException("Invalid request");
        }
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .completed(false)
                .build();
        Todo saved = todoRepository.save(todo);
        
        System.out.println("Todo service [ sucessful !!!!!!!!!!! ==> [20250813] ]")
        return new TodoResponse(saved);
    }

    @Transactional
    public TodoResponse update(long id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));

        todo.update(request.getTitle(), request.getContent(), request.isCompleted());

        return new TodoResponse(todo);
    }

    @Transactional
    public void delete(long id) {
        if(!todoRepository.existsById(id)) {
            throw new IllegalArgumentException("not found: " + id);
        }
        todoRepository.deleteById(id);
    }
}
