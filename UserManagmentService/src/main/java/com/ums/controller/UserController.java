package com.ums.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ums.dto.UserData;
import com.ums.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/admin")
	public void createAdmin() {
		userService.createAdmin();
	}
	
	@PostMapping("/others")
	public void createUsers(@RequestBody UserData userData) {
		userService.createUsers(userData);
	}
}
