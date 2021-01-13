package leapauth.backend.controller;

import leapauth.backend.dto.PasswordChangeDTO;
import leapauth.backend.dto.RegisterDTO;
import leapauth.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AccountController {

    private UserService userService;

    @Autowired
    AccountController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@RequestBody RegisterDTO registerDTO) {
       userService.registerUser(registerDTO);
    }

    @PostMapping("/changePassword")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDTO) {
        userService.changePassword(passwordChangeDTO);
    }
}
