package net.codecraft.todoback.repository;

import net.codecraft.todoback.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
