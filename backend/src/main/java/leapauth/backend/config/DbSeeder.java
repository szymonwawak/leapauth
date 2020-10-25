package leapauth.backend.config;

import leapauth.backend.model.User;
import leapauth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DbSeeder implements CommandLineRunner {

    private UserRepository userRepository;

    @Autowired
    public DbSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for (int i = 1; i < 4; i++) {
            User user = new User();
            user.setName("Name" + i);
            user.setSurname("Surname" + i);
            user.setEmail("address" + i + "@test.com");
            user.setPassword("password" + i);
            userRepository.save(user);
        }
    }
}
