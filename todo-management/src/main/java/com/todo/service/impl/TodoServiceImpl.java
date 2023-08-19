package com.todo.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.todo.dto.TodoDto;
import com.todo.entity.Todo;
import com.todo.exception.ResourceNotFoundException;
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

	@Override
	public TodoDto getTodo(Long todoId) {
		Todo todo = todoRepo.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("Todo not found with given id : " + todoId));
		return modelMapper.map(todo, TodoDto.class);
	}

	@Override
	public List<TodoDto> getAllTodos() {
		List<Todo> todoList = todoRepo.findAll();
		return todoList.stream().map((todo) -> modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
	}

	@Override
	public TodoDto updateTodo(Long id, TodoDto todoDto) {
		Todo todo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with given id : " + id));
		todo.setTitle(todoDto.getTitle());
		todo.setDescription(todoDto.getDescription());
		todo.setCompleted(todoDto.isCompleted());
		todoRepo.save(todo);
		return modelMapper.map(todo, TodoDto.class);
	}

	@Override
	public void deleteTodo(Long id) {
		Todo todo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with given id : " + id));
		todoRepo.deleteById(id);
	}

	@Override
	public TodoDto completeTodo(Long id) {
		Todo todo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with given id : " + id));
		todo.setCompleted(Boolean.TRUE);
		todoRepo.save(todo);
		return modelMapper.map(todo, TodoDto.class);
	}

	@Override
	public TodoDto inCompleteTodo(Long id) {
		Todo todo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with given id : " + id));
		todo.setCompleted(Boolean.FALSE);
		todoRepo.save(todo);
		return modelMapper.map(todo, TodoDto.class);
	}

}
