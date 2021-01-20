package leapauth.backend.repository;

import leapauth.backend.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    public Optional<List<Authority>> findAuthoritiesByName(String name);
}
