package leapauth.backend.model;

import lombok.Data;

@Data
public class StatsVM {
    private Integer totalLeapAuthorizations;
    private Integer totalLeapFailedAuthorizations;
    private Double averageGestureDifference;

    public StatsVM() {
    }

    public StatsVM(Integer totalLeapAuthorizations, Integer totalLeapFailedAuthorizations, Double averageGestureDifference) {
        this.totalLeapAuthorizations = totalLeapAuthorizations;
        this.totalLeapFailedAuthorizations = totalLeapFailedAuthorizations;
        this.averageGestureDifference = averageGestureDifference;
    }
}
