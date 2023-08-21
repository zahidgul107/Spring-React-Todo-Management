package com.todo.service;

import com.todo.dto.LoginDto;
import com.todo.dto.RegisterDto;

public interface AuthService {
	
	String register(RegisterDto registerDto);
	
	String login(LoginDto loginDto);

}
