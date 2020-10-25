package leapauth.backend.service;

import leapauth.backend.dto.UserDTO;
import leapauth.backend.model.User;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.util.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAll() {
        List<User> users = userRepository.findAll();
        return MapperUtils.mapAll(users, UserDTO.class);
    }
}
