package leapauth.backend.model;

import lombok.Data;

@Data
public class StatsPackVM {
    private StatsVM day;
    private StatsVM week;
    private StatsVM month;
    private StatsVM total;

    public StatsPackVM(StatsVM day, StatsVM week, StatsVM month, StatsVM total) {
        this.day = day;
        this.week = week;
        this.month = month;
        this.total = total;
    }
}
