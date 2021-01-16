package leapauth.backend.service;

import leapauth.backend.model.LeapLoginModel;
import leapauth.backend.model.User;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.security.TokenProvider;
import leapauth.backend.service.exception.AuthorizationErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private TokenProvider tokenProvider;
    private UserRepository userRepository;
    private DynamicTimeWarpingService dynamicTimeWarpingService;

    @Autowired
    public AuthService(TokenProvider tokenProvider, UserRepository userRepository,
                       DynamicTimeWarpingService dynamicTimeWarpingService) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.dynamicTimeWarpingService = dynamicTimeWarpingService;
    }

    public String authorizeUserWithGesture(LeapLoginModel leapLoginModel) {
        Optional<User> foundUser = userRepository.findOneByEmail(leapLoginModel.getEmail());
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            if (dynamicTimeWarpingService.recognizeGesture(user, leapLoginModel.getGesture()))
                return acceptUser(user);
        }
        throw new AuthorizationErrorException();
    }

    private String acceptUser(User user) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                null
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.createToken(authentication);
    }
}
