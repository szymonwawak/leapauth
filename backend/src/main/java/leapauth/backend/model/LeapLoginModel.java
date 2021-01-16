package leapauth.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class LeapLoginModel {
    private String email;
    private List<HandData> gesture;
}
