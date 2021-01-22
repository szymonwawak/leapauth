package leapauth.backend.service.exception;

public class MissingGestureException extends RuntimeException {
    public MissingGestureException() {
        super("User has no gesture saved");
    }
}
