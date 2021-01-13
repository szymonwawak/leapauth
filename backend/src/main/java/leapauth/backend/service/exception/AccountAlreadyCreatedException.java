package leapauth.backend.service.exception;

public class AccountAlreadyCreatedException extends RuntimeException {
    public AccountAlreadyCreatedException() {
        super("Account with given email already exists");
    }
}
