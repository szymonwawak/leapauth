package leapauth.backend.dto;

import lombok.Data;

@Data
public class PasswordChangeDTO {

    private String currentPassword;
    private String newPassword;
}
