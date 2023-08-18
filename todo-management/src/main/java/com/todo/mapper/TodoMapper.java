package com.todo.mapper;

import com.todo.dto.TodoDto;
import com.todo.entity.Todo;

public class TodoMapper {
	
	public static Todo mapToTodo(TodoDto todoDto) {
		return new Todo(
					todoDto.getId(),
					todoDto.getTitle(),
					todoDto.getDescription(),
					todoDto.isCompleted()
				);
	}
	
	public static TodoDto mapToTodoDto(Todo todo) {
		return new TodoDto(
					todo.getId(),
					todo.getTitle(),
					todo.getDescription(),
					todo.isCompleted()
				);
	}

}
