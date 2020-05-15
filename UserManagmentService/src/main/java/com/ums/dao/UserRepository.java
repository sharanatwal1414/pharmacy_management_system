package com.ums.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ums.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
}
