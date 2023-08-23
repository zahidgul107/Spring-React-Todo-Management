package com.todo.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todo.dto.LoginDto;
import com.todo.dto.RegisterDto;
import com.todo.entity.Role;
import com.todo.entity.User;
import com.todo.exception.TodoAPIException;
import com.todo.repository.RoleRepository;
import com.todo.repository.UserRepository;
import com.todo.security.JwtTokenProvider;
import com.todo.service.AuthService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private UserRepository userRepo;	
	private RoleRepository roleRepo;	
	private PasswordEncoder passwordEncoder;	
	private AuthenticationManager authenticationManager;
	private JwtTokenProvider jwtTokenProvider;

	@Override
	public String register(RegisterDto registerDto) {
		
		if (userRepo.existsByUsername(registerDto.getUsername())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username already exists!.");
		} else if (userRepo.existsByEmail(registerDto.getEmail())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email already exists!.");
		}
		
		User user = new User();
		user.setName(registerDto.getName());
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		
		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepo.findByName("ROLE_USER");
		roles.add(userRole);
		
		user.setRoles(roles);
		
		userRepo.save(user);
		
		return "User Registered Successfully!.";
	}

	@Override
	public String login(LoginDto loginDto) {


		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginDto.getUsernameOrEmail(), 
				loginDto.getPassword()
			));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtTokenProvider.generateToken(authentication);
		return token;
	}

}
