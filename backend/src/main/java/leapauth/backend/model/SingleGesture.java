package leapauth.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class SingleGesture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Lob
    @JsonIgnore
    private byte[] gestureData;

    @ManyToOne
    @JoinColumn(name = "fk_gesture")
    private Gesture gesture;

}
