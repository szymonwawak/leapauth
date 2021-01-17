package leapauth.backend.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginAttempts {

    private int counter;
    private LocalDateTime blockDate;
    private final int MAX_FAILED_ATTEMPTS = 2;
    public LoginAttempts() {
        this.counter = 1;
    }

    public void incrementCounter() {
        this.counter++;
        if (this.counter > MAX_FAILED_ATTEMPTS) {
            this.blockDate = LocalDateTime.now().plusMinutes(5);
        }
    }

    public void clear() {
        this.counter = 0;
        this.blockDate = null;
    }
}
