package net.codecraft.todoback.dto;

import lombok.Getter;
import net.codecraft.todoback.domain.Todo;

@Getter
public class TodoResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final boolean completed;

    public TodoResponse(Todo todo) {
        this.id = todo.getId();
        this.title = todo.getTitle();
        this.content = todo.getContent();
        this.completed = todo.isCompleted();
    }
}
