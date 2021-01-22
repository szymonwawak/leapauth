package leapauth.backend.service;

import leapauth.backend.dto.PasswordChangeDTO;
import leapauth.backend.dto.RegisterDTO;
import leapauth.backend.dto.UserAdminDTO;
import leapauth.backend.dto.UserDTO;
import leapauth.backend.model.User;
import leapauth.backend.repository.AuthorityRepository;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.service.exception.AccountAlreadyCreatedException;
import leapauth.backend.service.exception.InvalidPasswordException;
import leapauth.backend.service.exception.UnauthorizedAccessException;
import leapauth.backend.util.MapperUtils;
import leapauth.backend.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthorityRepository authorityRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
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
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setAuthorities(authorityRepository.findAuthoritiesByName("user").get());
        userRepository.save(newUser);
    }

    public void changePassword(PasswordChangeDTO passwordChangeDTO) {
        String email = SecurityUtils.getCurrentUserEmail();
        userRepository.findOneByEmail(email)
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

    public List<UserAdminDTO> getUsersForAdminPanel() {
        if (!SecurityUtils.isCurrentUserAdmin()) throw new UnauthorizedAccessException();
        List<User> users = userRepository.findAll();
        List<UserAdminDTO> userAdminDTOList = new ArrayList<>();
        for (User user : users) {
            UserAdminDTO userAdminDTO = MapperUtils.map(user, UserAdminDTO.class);
            userAdminDTO.setIsAdmin(user.getAuthorities().stream()
                    .anyMatch(authority -> authority.getName().equals("admin")));
            userAdminDTOList.add(userAdminDTO);
        }
        return userAdminDTOList;
    }

    public void addAdminAuthority(Long userId) {
        if (!SecurityUtils.isCurrentUserAdmin()) throw new UnauthorizedAccessException();
        User user = userRepository.getOne(userId);
        user.addAuthority(authorityRepository.findAuthorityByName("admin").get());
        userRepository.save(user);
    }
}
