package leapauth.backend.controller;

import leapauth.backend.model.Gesture;
import leapauth.backend.model.GesturesVM;
import leapauth.backend.service.GestureService;
import leapauth.backend.util.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/api/gestures")
public class GestureController {

    private GestureService gestureService;

    @Autowired
    public GestureController(GestureService gestureService) {
        this.gestureService = gestureService;
    }

    @PostMapping("/saveGestureForCurrentUser")
    public ResponseEntity<String> saveGestureForCurrentUser(@RequestParam("gestureVisualization") MultipartFile gestureVisualization, @RequestParam("gestures") String gesturesList) {
        try {
            GesturesVM gestures = MapperUtils.mapJsonToObject(gesturesList, GesturesVM.class);
            gestureService.saveUserGesture(gestures, gestureVisualization);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }

    @GetMapping("/visualization/{userId}")
    public ResponseEntity getVisualization(Long userId) {
        try {
            return new ResponseEntity(gestureService.getVisualization(userId), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Gesture> getGesture(@PathVariable Long userId) {
        try {
            return new ResponseEntity(gestureService.get(userId), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(), HttpStatus.valueOf(500));
        }
    }
}
