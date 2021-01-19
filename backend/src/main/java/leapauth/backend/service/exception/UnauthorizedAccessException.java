package leapauth.backend.service.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException() {
        super("Tried to access resource without permission");
    }
}
