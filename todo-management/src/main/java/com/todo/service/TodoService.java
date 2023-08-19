package com.todo.service;

import java.util.List;

import com.todo.dto.TodoDto;

public interface TodoService {
	
	TodoDto addTodo(TodoDto todoDto);
	
	TodoDto getTodo(Long todoId);
	
	List<TodoDto> getAllTodos();
	
	TodoDto updateTodo(Long id, TodoDto todoDto);
	
	void deleteTodo(Long id);
	
	TodoDto completeTodo(Long id);
	
	TodoDto inCompleteTodo(Long id);

}
