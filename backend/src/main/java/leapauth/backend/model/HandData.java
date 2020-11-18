package leapauth.backend.model;

import lombok.Data;

import java.util.Map;

@Data
public class HandData {
    private String handType;
    private int frameIdentifier;
    private Map<String, Double> data;
}
