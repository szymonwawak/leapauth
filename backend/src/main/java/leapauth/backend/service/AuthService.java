package leapauth.backend.service;

import leapauth.backend.model.*;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.security.TokenProvider;
import leapauth.backend.service.exception.AuthorizationErrorException;
import leapauth.backend.service.exception.LoginLockedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private TokenProvider tokenProvider;
    private UserRepository userRepository;
    private LeapAuthorizationService leapAuthorizationService;
    private final Map<String, LoginAttempts> loginAttemptsMap = new HashMap<>();

    @Autowired
    public AuthService(TokenProvider tokenProvider, UserRepository userRepository,
                       LeapAuthorizationService leapAuthorizationService) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.leapAuthorizationService = leapAuthorizationService;
    }

    public String authorizeUserWithGesture(LeapLoginModel leapLoginModel) {
        String email = leapLoginModel.getEmail();
        Optional<User> foundUser = userRepository.findOneByEmail(email);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            if (leapAuthorizationService.recognizeGesture(user, leapLoginModel.getGesture()))
                return acceptUser(user);
        }
        addFailedLoginAttempt(email);
        throw new AuthorizationErrorException();
    }

    private String acceptUser(User user) {
        String email = user.getEmail();
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.createAuthorityList(user.getAuthorities()
                .stream()
                .map(Authority::getName)
                .collect(Collectors.joining(",")));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                email,
                null,
                grantedAuthorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        clearLoginAttempts(email);
        return tokenProvider.createToken(authentication);
    }

    public void checkLoginLock(LoginModel loginModel) {
        LoginAttempts loginAttempts = loginAttemptsMap.get(loginModel.getEmail());
        LocalDateTime currentTime = LocalDateTime.now();
        if (loginAttempts != null) {
            LocalDateTime lockTime = loginAttempts.getBlockDate();
            if (lockTime != null && lockTime.isAfter(currentTime))
                throw new LoginLockedException();
        }
    }

    public void addFailedLoginAttempt(String email) {
        LoginAttempts loginAttempts = loginAttemptsMap.get(email);
        if (loginAttempts != null) {
            loginAttempts.incrementCounter();
        } else {
            loginAttempts = new LoginAttempts();
            loginAttemptsMap.put(email, loginAttempts);
        }
    }

    public void clearLoginAttempts(String email) {
        LoginAttempts loginAttempts = loginAttemptsMap.get(email);
        if (loginAttempts != null) {
            loginAttempts.clear();
        }
    }
}
