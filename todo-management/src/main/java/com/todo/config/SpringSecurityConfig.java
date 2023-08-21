package com.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.AllArgsConstructor;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SpringSecurityConfig {
	
	private UserDetailsService userDetailsService;
	
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http.csrf().disable()
			.authorizeRequests((authorize) -> {
//				authorize.requestMatchers(HttpMethod.POST, "/").hasRole("ADMIN");
//				authorize.requestMatchers(HttpMethod.PUT, "/").hasRole("ADMIN");
//				authorize.requestMatchers(HttpMethod.DELETE, "/").hasRole("ADMIN");
//				authorize.requestMatchers(HttpMethod.GET, "/").hasAnyRole("ADMIN", "USER");
//				authorize.requestMatchers(HttpMethod.PATCH, "/").hasAnyRole("ADMIN", "USER");
//				authorize.requestMatchers(HttpMethod.GET, "/").permitAll();
				authorize.requestMatchers("/auth/**").permitAll();
			authorize.anyRequest().authenticated();
		}).httpBasic(Customizer.withDefaults());
			
		return http.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
	

}
