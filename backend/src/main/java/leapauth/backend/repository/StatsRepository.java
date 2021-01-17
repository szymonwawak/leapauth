package leapauth.backend.repository;

import leapauth.backend.model.Stats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatsRepository extends JpaRepository<Stats, Long> {
}
