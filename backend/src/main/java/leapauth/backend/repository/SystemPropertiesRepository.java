package leapauth.backend.repository;

import leapauth.backend.model.SystemProperties;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemPropertiesRepository extends JpaRepository<SystemProperties, Long> {
}
