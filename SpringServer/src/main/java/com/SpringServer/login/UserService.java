package com.SpringServer.login;

import com.SpringServer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public boolean checkPassword(User user, String password) {
        return user.getPassword().equals(password);
    }
}
