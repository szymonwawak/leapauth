package leapauth.backend.model;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Data
public class Stats {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private Long id;

    private Integer totalLeapAuthorizations;
    private Integer totalLeapFailedAuthorizations;
    private Double averageGestureDifference;

    @OneToOne(mappedBy = "userStats", cascade = CascadeType.ALL)
    private User user;
}
