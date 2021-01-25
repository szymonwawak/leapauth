package leapauth.backend.model;

import lombok.Data;
import lombok.Getter;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="gesture")
@Data
public class Gesture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Double gesturePrecision;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "gesture_id")
    private List<SingleGesture> gestures = new ArrayList<>();

    @Lob
    @JsonIgnore
    private byte[] visualisation;

    @Getter(onMethod_ = @__(@JsonIgnore))
    @OneToOne(mappedBy = "gesture")
    private User user;

    public void addSingleGesture(SingleGesture gesture) {
        gestures.add(gesture);
    }
}
