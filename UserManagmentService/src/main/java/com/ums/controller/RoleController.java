package com.ums.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ums.dto.UserData;
import com.ums.model.Role;
import com.ums.service.UserService;

@RestController
@RequestMapping("roles")
public class RoleController {
	
	@Autowired
	UserService userService;
	
	@GetMapping
	public List<Role> getRoles() {
		return userService.getRoles();
	}
	
}
