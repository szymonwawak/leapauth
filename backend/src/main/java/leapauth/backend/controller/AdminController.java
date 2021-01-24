package leapauth.backend.controller;

import leapauth.backend.dto.UserAdminDTO;
import leapauth.backend.model.LeapLoginAttempt;
import leapauth.backend.model.StatsPackVM;
import leapauth.backend.model.SystemProperties;
import leapauth.backend.service.StatsService;
import leapauth.backend.service.SystemPropertiesService;
import leapauth.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

    private StatsService statsService;
    private UserService userService;
    private SystemPropertiesService systemPropertiesService;

    @Autowired
    public AdminController(StatsService statsService, UserService userService,
                           SystemPropertiesService systemPropertiesService) {
        this.statsService = statsService;
        this.userService = userService;
        this.systemPropertiesService = systemPropertiesService;
    }

    @GetMapping("/totalSystemStats")
    public StatsPackVM getTotalSystemStats() {
        return statsService.getTotalSystemStats();
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAdminDTO>> getUsersForAdminPanel() {
        return new ResponseEntity<List<UserAdminDTO>>(userService.getUsersForAdminPanel(), HttpStatus.OK);
    }

    @PostMapping("/addAdminAuthority")
    public ResponseEntity changePassword(@RequestBody Long userId) {
        try {
            userService.addAdminAuthority(userId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }

    @PostMapping("/setProperties")
    public ResponseEntity setSystemProperties(@RequestBody SystemProperties systemProperties) {
        try {
            systemPropertiesService.setSystemProperties(systemProperties);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }

    @GetMapping("/systemProperties")
    public ResponseEntity getSystemProperties() {
        try {
            return new ResponseEntity(SystemPropertiesService.getSystemProperties(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }

    @GetMapping("todayLoginAttempts")
    public ResponseEntity getTodayLoginAttempts() {
        try {
            List<LeapLoginAttempt> leapLoginAttempts = statsService.getTodayLoginAttempts();
            return new ResponseEntity(leapLoginAttempts, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }
}
