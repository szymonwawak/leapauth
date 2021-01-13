package leapauth.backend.dto;

import lombok.Data;

@Data
public class RegisterDTO extends UserDTO{

    public static final int MIN_PASSWORD_LENGTH = 6;
    public static final int MAX_PASSWORD_LENGTH = 50;

    private String password;
}
