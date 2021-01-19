package leapauth.backend.util;

import leapauth.backend.model.User;
import leapauth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    private static UserRepository userRepository;

    @Autowired
    public SecurityUtils(UserRepository userRepository) {
        SecurityUtils.userRepository = userRepository;
    }

    public static String getCurrentUserEmail() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return extractPrincipal(securityContext.getAuthentication());
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            return (String) authentication.getPrincipal();
        }
        return null;
    }

    public static User getCurrentUser() {
        String login = getCurrentUserEmail();
        return userRepository.findOneByEmail(login).get();
    }

    public static boolean isCurrentUserAdmin() {
        User user = getCurrentUser();
        return user.getAuthorities()
                .stream()
                .anyMatch(authority -> authority.getName().equals("admin"));
    }
}
