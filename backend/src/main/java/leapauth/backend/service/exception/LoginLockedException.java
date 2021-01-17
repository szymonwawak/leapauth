package leapauth.backend.service.exception;

public class LoginLockedException extends RuntimeException {
    public LoginLockedException() {
        super("Login for this account has been blocked. Try again in few minutes");
    }
}
