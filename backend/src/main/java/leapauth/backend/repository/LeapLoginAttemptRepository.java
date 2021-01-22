package leapauth.backend.repository;

import leapauth.backend.model.LeapLoginAttempt;
import leapauth.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface LeapLoginAttemptRepository  extends JpaRepository<LeapLoginAttempt, Long> {
    public List<LeapLoginAttempt> getByUserAndDateBetween(User user, LocalDateTime from, LocalDateTime to);
    public List<LeapLoginAttempt> getByDateBetween(LocalDateTime from, LocalDateTime to);
    public List<LeapLoginAttempt> getByDateAfter(LocalDateTime date);
}
