package com.ums.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ums.dao.RoleRepository;
import com.ums.dao.UserRepository;
import com.ums.dto.UserData;
import com.ums.model.Role;
import com.ums.model.User;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	public void insertUser() {
		
	}
	
	public void createAdmin() {
		User user = new User();
		user.setUserName("Admin");
		user.setEmail("admin@gmail.com");
		
		Role role = new Role();
		role.setRoleName("Admin");
		user.setRole(role);
		
		userRepository.save(user);
		
	}
	
	public void createUsers(UserData userData) {
		Role role  = roleRepository.getOne(userData.getRoleId());
		User user = new User();
		user.setUserName(userData.getUserName());
		user.setEmail(userData.getEmail());
		user.setRole(role);
		userRepository.save(user);
	}
	
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}
}
