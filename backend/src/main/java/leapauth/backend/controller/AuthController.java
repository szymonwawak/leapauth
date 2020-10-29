package leapauth.backend.controller;

import leapauth.backend.model.HandFrameData;
import leapauth.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {
    private final String MESSAGE_RESPONSE_DESTINATION = "/queue/users/authorize/";
    private SimpMessagingTemplate simpMessagingTemplate;
    private AuthService authService;

    @Autowired
    public AuthController(SimpMessagingTemplate simpMessagingTemplate, AuthService authService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.authService = authService;
    }

    @MessageMapping("/authorize/{userId}")
    public void authenticateLeapUser(@DestinationVariable String userId, @Payload HandFrameData handFrameData) {
        authService.processFrameData(userId, handFrameData);
    }
}
