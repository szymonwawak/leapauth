package leapauth.backend.security;

import leapauth.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationEventListener {

    private AuthService authService;

    @Autowired
    public AuthenticationEventListener(AuthService authService) {
        this.authService = authService;
    }

    @EventListener
    public void authenticationFailed(AuthenticationFailureBadCredentialsEvent event) {
        String email = (String) event.getAuthentication().getPrincipal();
        authService.addFailedLoginAttempt(email);
    }

}
