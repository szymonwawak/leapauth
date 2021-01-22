package leapauth.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @JsonIgnoreProperties("leapLoginAttempts")
    @Getter(onMethod_ = @__(@JsonIgnore))
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public LeapLoginAttempt() {
    }

    public LeapLoginAttempt(Boolean success, Double gestureDifference) {
        this.success = success;
        this.gestureDifference = gestureDifference;
        this.date = LocalDateTime.now();
    }
}
