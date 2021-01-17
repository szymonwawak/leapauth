package leapauth.backend.service;

import leapauth.backend.model.LeapLoginAttempt;
import leapauth.backend.model.Stats;
import leapauth.backend.model.User;
import leapauth.backend.repository.StatsRepository;
import leapauth.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    private UserRepository userRepository;
    private StatsRepository statsRepository;

    public StatsService(UserRepository userRepository, StatsRepository statsRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
    }

    public void addLoginAttempt(boolean success, double gestureDifference, User user) {
        LeapLoginAttempt leapLoginAttempt = new LeapLoginAttempt(success, gestureDifference);
        user.addLeapLoginAttempt(leapLoginAttempt);
        userRepository.save(user);
        recalculateUserStats(user);
    }

    private void recalculateUserStats(User user) {
        List<LeapLoginAttempt> leapLoginAttempts = user.getLeapLoginAttempts();
        Stats stats = user.getStats();
        if (stats == null) {
            stats = new Stats();
        }
        int totalAttempts = leapLoginAttempts.size();
        int failedAuthorizations = (int) leapLoginAttempts.stream()
                .filter(leapLoginAttempt -> !leapLoginAttempt.getSuccess())
                .count();
        double averageGesturePrecisionSum = leapLoginAttempts.stream()
                .mapToDouble(LeapLoginAttempt::getGestureDifference)
                .sum();
        stats.setTotalLeapAuthorizations(totalAttempts);
        stats.setTotalLeapFailedAuthorizations(failedAuthorizations);
        stats.setAverageGestureDifference(averageGesturePrecisionSum / totalAttempts);
        statsRepository.save(stats);
    }
}
