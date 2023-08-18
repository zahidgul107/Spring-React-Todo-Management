package com.todo.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.todo.dto.TodoDto;
import com.todo.entity.Todo;
import com.todo.mapper.TodoMapper;
import com.todo.repository.TodoRepository;
import com.todo.service.TodoService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
	
	private TodoRepository todoRepo;
	
	private ModelMapper modelMapper;

	@Override
	public TodoDto addTodo(TodoDto todoDto) {
		Todo todo = modelMapper.map(todoDto, Todo.class);
		Todo savedTodo = todoRepo.save(todo);
		TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class); 
		return savedTodoDto;
	}

}
