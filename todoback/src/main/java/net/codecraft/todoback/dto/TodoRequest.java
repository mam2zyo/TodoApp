package net.codecraft.todoback.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoRequest {
    private String title;
    private String content;
    private boolean completed; // field의 boolean 기본값이 false임을 이용할 예정
}
