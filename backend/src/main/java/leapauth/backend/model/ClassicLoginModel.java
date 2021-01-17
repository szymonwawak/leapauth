package leapauth.backend.model;

import lombok.Data;

@Data
public class ClassicLoginModel extends LoginModel {
    private String password;
}
