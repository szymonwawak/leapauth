package leapauth.backend.config;

import leapauth.backend.model.Authority;
import leapauth.backend.model.Stats;
import leapauth.backend.model.User;
import leapauth.backend.repository.AuthorityRepository;
import leapauth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DbSeeder implements CommandLineRunner {

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DbSeeder(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        Authority authority = new Authority();
        authority.setName("user");
        authorityRepository.save(authority);
        List<Authority> authorities = new ArrayList<>();
        authorities.add(authority);
        authority = new Authority();
        authority.setName("admin");
        authorityRepository.save(authority);
        User user = new User();
        user.setName("Jan");
        user.setSurname("Kowalski");
        user.setEmail("jan.kowalski@test.com");
        user.setPassword(passwordEncoder.encode("password1"));
        user.setAuthorities(authorities);
        user.setStats(new Stats());
        userRepository.save(user);
        user = new User();
        user.setName("Adam");
        user.setSurname("Nowak");
        user.setEmail("adam.nowak@test.com");
        user.setPassword(passwordEncoder.encode("password2"));
        user.setAuthorities(authorities);
        user.addAuthority(authority);
        user.setStats(new Stats());
        userRepository.save(user);
    }
}
