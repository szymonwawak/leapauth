package leapauth.backend.repository;

import leapauth.backend.model.SingleGesture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SingleGestureRepository extends JpaRepository<SingleGesture, Long> {
}
