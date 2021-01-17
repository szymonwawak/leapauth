package leapauth.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class LeapLoginModel extends LoginModel {
    private List<HandData> gesture;
}
