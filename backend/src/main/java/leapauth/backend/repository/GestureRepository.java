package leapauth.backend.repository;

import leapauth.backend.model.Gesture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GestureRepository extends JpaRepository<Gesture, Long> {
}
