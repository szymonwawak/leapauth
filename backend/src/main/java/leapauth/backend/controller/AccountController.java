package leapauth.backend.controller;

import leapauth.backend.dto.PasswordChangeDTO;
import leapauth.backend.dto.RegisterDTO;
import leapauth.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity registerAccount(@RequestBody RegisterDTO registerDTO) {
        try {
            userService.registerUser(registerDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity changePassword(@RequestBody PasswordChangeDTO passwordChangeDTO) {
        try {
            userService.changePassword(passwordChangeDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }
}
