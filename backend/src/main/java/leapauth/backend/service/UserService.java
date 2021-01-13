package leapauth.backend.service;

import leapauth.backend.dto.PasswordChangeDTO;
import leapauth.backend.dto.RegisterDTO;
import leapauth.backend.dto.UserDTO;
import leapauth.backend.model.User;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.service.exception.AccountAlreadyCreatedException;
import leapauth.backend.service.exception.InvalidPasswordException;
import leapauth.backend.util.MapperUtils;
import leapauth.backend.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAll() {
        List<User> users = userRepository.findAll();
        return MapperUtils.mapAll(users, UserDTO.class);
    }

    public void registerUser(RegisterDTO managedUser) {
        String password = managedUser.getPassword();
        if (!isPasswordCorrect(password)) {
            throw new InvalidPasswordException();
        }
        userRepository.findOneByEmail(managedUser.getEmail().toLowerCase()).ifPresent(
                user -> {
                    throw new AccountAlreadyCreatedException();
                }
        );
        User newUser = MapperUtils.map(managedUser, User.class);
        managedUser.setPassword(passwordEncoder.encode(password));
        userRepository.save(newUser);
    }

    public void changePassword(PasswordChangeDTO passwordChangeDTO) {
        SecurityUtils.getCurrentUserEmail()
                .flatMap(userRepository::findOneByEmail)
                .ifPresent(
                        user -> {
                            if (!arePasswordsForChangeCorrect(passwordChangeDTO, user)) {
                                throw new InvalidPasswordException();
                            }
                            setNewPassword(user, passwordChangeDTO.getNewPassword());
                        }
                );
    }

    private boolean isPasswordCorrect(String password) {
        int length = password.length();
        return !password.isEmpty()
                && length > RegisterDTO.MIN_PASSWORD_LENGTH && length < RegisterDTO.MAX_PASSWORD_LENGTH;
    }

    private boolean arePasswordsForChangeCorrect(PasswordChangeDTO passwordChangeDTO, User user) {
        return passwordEncoder.matches(passwordChangeDTO.getCurrentPassword(), user.getPassword())
                && isPasswordCorrect(passwordChangeDTO.getNewPassword());
    }

    private void setNewPassword(User user, String newPassword) {
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}
