package leapauth.backend.controller;

import leapauth.backend.model.StatsPackVM;
import leapauth.backend.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

    private StatsService statsService;

    @Autowired
    public AdminController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/totalSystemStats")
    public StatsPackVM getTotalSystemStats() {
        return statsService.getTotalSystemStats();
    }
}
