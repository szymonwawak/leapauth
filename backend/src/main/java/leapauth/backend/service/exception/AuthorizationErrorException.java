package leapauth.backend.service.exception;

public class AuthorizationErrorException extends RuntimeException {
    public AuthorizationErrorException() {
        super("Authorization failed");
    }
}
