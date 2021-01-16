package leapauth.backend.service.exception;

public class MissingCurrentUserException extends RuntimeException {

    public MissingCurrentUserException() {
        super("Couldn't retrieve current user for session");
    }
}
