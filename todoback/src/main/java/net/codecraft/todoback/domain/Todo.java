package net.codecraft.todoback.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo {

    @Id
    @Column(name = "id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String content;

    @Column(nullable = false)
    private boolean completed;

    @Builder
    public Todo(String title, String content, boolean completed) {
        this.title = title;
        this.content = content;
        this.completed = completed;
    }

    public void update(String title, String content, boolean completed) {
        this.title = title;
        this.content = content;
        this.completed = completed;
    }
}
