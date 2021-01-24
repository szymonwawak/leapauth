package leapauth.backend.service;

import leapauth.backend.model.SystemProperties;
import leapauth.backend.repository.SystemPropertiesRepository;
import leapauth.backend.service.exception.UnauthorizedAccessException;
import leapauth.backend.util.SecurityUtils;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemPropertiesService {

    private static SystemProperties systemProperties;
    SystemPropertiesRepository systemPropertiesRepository;

    public SystemPropertiesService(SystemPropertiesRepository systemPropertiesRepository) {
        this.systemPropertiesRepository = systemPropertiesRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadCurrentProperties() {
        List<SystemProperties> systemPropertiesList = systemPropertiesRepository.findAll();
        if (!systemPropertiesList.isEmpty())
            systemProperties = systemPropertiesList.get(0);
    }

    public static SystemProperties getSystemProperties() {
        return systemProperties;
    }

    public void setSystemProperties(SystemProperties systemProperties) {
        if (!SecurityUtils.isCurrentUserAdmin()) throw new UnauthorizedAccessException();
        if (systemProperties == null)
            systemProperties = new SystemProperties();
        systemProperties.setId(systemProperties.getId());
        SystemPropertiesService.systemProperties = systemProperties;
        systemPropertiesRepository.save(systemProperties);
    }
}
