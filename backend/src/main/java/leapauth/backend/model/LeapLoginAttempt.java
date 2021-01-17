package leapauth.backend.model;

import lombok.Data;
import lombok.Getter;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class LeapLoginAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    Boolean success;
    LocalDateTime date;
    Double gestureDifference;

    @Getter(onMethod_ = @__(@JsonIgnore))
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "login_attempt_id")
    private User user;

    public LeapLoginAttempt() {
    }

    public LeapLoginAttempt(Boolean success, Double gestureDifference) {
        this.success = success;
        this.gestureDifference = gestureDifference;
        this.date = LocalDateTime.now();
    }
}
