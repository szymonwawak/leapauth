package leapauth.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    @Getter
    private Long id;
    @Getter
    private String name;
    @Getter
    private String surname;
    @Getter
    private String email;
    @Getter
    private String password;

    @Getter
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_name")
    )
    private Set<Authority> authorities = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user")
    private Gesture gesture;

    @JsonIgnoreProperties("user")
    public Gesture getGesture() {
        return gesture;
    }
}
