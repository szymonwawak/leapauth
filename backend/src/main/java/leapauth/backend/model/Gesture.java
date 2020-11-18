package leapauth.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Gesture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gesture")
    private Set<SingleGesture> gestures = new HashSet<>();

    @Lob
    @JsonIgnore
    private byte[] visualisation;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "fk_user")
    private User user;
}
