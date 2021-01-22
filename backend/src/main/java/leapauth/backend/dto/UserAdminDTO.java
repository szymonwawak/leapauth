package leapauth.backend.dto;

import lombok.Data;

@Data
public class UserAdminDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Boolean isAdmin;
}
