package leapauth.backend.service;

import leapauth.backend.model.*;
import leapauth.backend.repository.LeapLoginAttemptRepository;
import leapauth.backend.repository.StatsRepository;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.service.exception.UnauthorizedAccessException;
import leapauth.backend.util.MapperUtils;
import leapauth.backend.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatsService {

    private UserRepository userRepository;
    private StatsRepository statsRepository;
    private LeapLoginAttemptRepository leapLoginAttemptRepository;

    @Autowired
    public StatsService(UserRepository userRepository, StatsRepository statsRepository,
                        LeapLoginAttemptRepository leapLoginAttemptRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
        this.leapLoginAttemptRepository = leapLoginAttemptRepository;
    }

    public StatsPackVM getFullUserStats(Long id) {
        User user;
        if (id != null && id != 0) {
            if (!SecurityUtils.isCurrentUserAdmin()) throw new UnauthorizedAccessException();
            user = userRepository.findById(id).get();
        } else {
            user = SecurityUtils.getCurrentUser();
        }
        return prepareStats(user);
    }

    private StatsPackVM prepareStats(User user) {
        StatsVM today = getUserStatsByDateRange(LocalDate.now().atTime(0, 0), LocalDateTime.now(), user);
        StatsVM week = getUserStatsByDateRange(LocalDate.now().minusDays(7).atStartOfDay(), LocalDateTime.now(), user);
        StatsVM month = getUserStatsByDateRange(LocalDate.now().minusMonths(1).atStartOfDay(), LocalDateTime.now(), user);
        StatsVM total = prepareTotalUserStats(user);
        return new StatsPackVM(today, week, month, total);
    }

    private StatsVM getUserStatsByDateRange(LocalDateTime from, LocalDateTime to, User user) {
        List<LeapLoginAttempt> leapLoginAttemptList = leapLoginAttemptRepository.getByUserAndDateBetween(user, from, to);
        return getStatsVMFromLoginAttemptList(leapLoginAttemptList);
    }

    private StatsVM getStatsVMFromLoginAttemptList(List<LeapLoginAttempt> leapLoginAttemptList) {
        int totalAuthorizations = leapLoginAttemptList.size();
        int totalFailedAuthorizations = 0;
        double averageGestureDifference = 0;
        for (LeapLoginAttempt loginAttempt : leapLoginAttemptList) {
            if (!loginAttempt.getSuccess()) {
                totalFailedAuthorizations++;
            }
            averageGestureDifference += loginAttempt.getGestureDifference();
        }
        if (averageGestureDifference != 0) averageGestureDifference /= totalAuthorizations;
        return new StatsVM(totalAuthorizations, totalFailedAuthorizations, averageGestureDifference);
    }

    private StatsVM prepareTotalUserStats(User user) {
        return MapperUtils.map(user.getStats(), StatsVM.class);
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

    public StatsPackVM getTotalSystemStats() {
        if (!SecurityUtils.isCurrentUserAdmin()) throw new UnauthorizedAccessException();
        StatsVM today = getStatsByDateRange(LocalDate.now().atTime(0, 0), LocalDateTime.now());
        StatsVM week = getStatsByDateRange(LocalDate.now().minusDays(7).atStartOfDay(), LocalDateTime.now());
        StatsVM month = getStatsByDateRange(LocalDate.now().minusMonths(1).atStartOfDay(), LocalDateTime.now());
        StatsVM total = getStatsByDateRange(LocalDate.now().minusYears(100).atStartOfDay(), LocalDateTime.now());
        return new StatsPackVM(today, week, month, total);
    }

    private StatsVM getStatsByDateRange(LocalDateTime from, LocalDateTime to) {
        List<LeapLoginAttempt> leapLoginAttemptList = leapLoginAttemptRepository.getByDateBetween(from, to);
        return getStatsVMFromLoginAttemptList(leapLoginAttemptList);
    }

    public List<LeapLoginAttempt> getTodayLoginAttempts() {
        if (!SecurityUtils.isCurrentUserAdmin()) throw new UnauthorizedAccessException();
        return leapLoginAttemptRepository.getByDateAfter(LocalDate.now().atTime(0,0));
    }
}
