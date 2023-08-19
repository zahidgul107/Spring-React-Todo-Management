package com.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.dto.TodoDto;
import com.todo.service.TodoService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/")
public class TodoController {
	
	private TodoService todoSer;
	
	@PostMapping("addTodo")
	public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
		TodoDto savedTodoDto = todoSer.addTodo(todoDto);
		return new ResponseEntity<>(savedTodoDto, HttpStatus.CREATED);
	}
	
	@GetMapping("getTodo/{id}")
	public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long todoId) {
		TodoDto todoDto = todoSer.getTodo(todoId);
		return new ResponseEntity<> (todoDto, HttpStatus.OK);
	}
	
	@GetMapping("getAllTodos")
	public ResponseEntity<List<TodoDto>> getAllTodo() {
		List<TodoDto> todoList = todoSer.getAllTodos();
		return ResponseEntity.ok(todoList);
	}
	
	@PutMapping("updateTodo/{id}")
	public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @RequestBody TodoDto todoDto) {
		TodoDto updatedTodo = todoSer.updateTodo(id, todoDto);
		return ResponseEntity.ok(updatedTodo);
	}
	
	@DeleteMapping("deleteTodo/{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
		todoSer.deleteTodo(id);
		return ResponseEntity.ok("Todo Deleted successfully!.");
	}
	
	@PatchMapping("completeTodo/{id}")
	public ResponseEntity<TodoDto> completeTodo(@PathVariable Long id) {
		TodoDto updatedTodo = todoSer.completeTodo(id);
		return ResponseEntity.ok(updatedTodo);
	}
	
	@PatchMapping("inCompleteTodo/{id}")
	public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable Long id) {
		TodoDto updatedTodo = todoSer.inCompleteTodo(id);
		return ResponseEntity.ok(updatedTodo);
	}

}
