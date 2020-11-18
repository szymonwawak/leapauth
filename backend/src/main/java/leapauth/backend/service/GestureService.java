package leapauth.backend.service;

import leapauth.backend.model.*;
import leapauth.backend.repository.GestureRepository;
import leapauth.backend.repository.SingleGestureRepository;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.util.SecurityUtils;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@EnableAsync
public class GestureService {

    private UserRepository userRepository;
    private GestureRepository gestureRepository;
    private SingleGestureRepository singleGestureRepository;

    @Autowired
    public GestureService(UserRepository userRepository,
                          GestureRepository gestureRepository,
                          SingleGestureRepository singleGestureRepository) {
        this.userRepository = userRepository;
        this.gestureRepository = gestureRepository;
        this.singleGestureRepository = singleGestureRepository;
    }

    public void saveUserGesture(GesturesVM gesturesVM, MultipartFile gestureVisualization) {
        Optional<User> foundCurrentUser = SecurityUtils.getCurrentUser();
        if (foundCurrentUser.isEmpty()) {
            return;
        }
        User user = foundCurrentUser.get();
        Gesture gesture = saveNewGesture(gesturesVM, gestureVisualization);
        assignNewGestureToUser(user, gesture);
    }

    private Gesture saveNewGesture(GesturesVM gesturesVM, MultipartFile gestureVisualization) {
        Gesture gesture = new Gesture();
        try {
            gesture.setVisualisation(gestureVisualization.getBytes());
            addFramesDataToGesture(gesturesVM, gesture);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return gesture;
    }

    private void addFramesDataToGesture(GesturesVM gestures, Gesture gesture) throws IOException {
        Set<SingleGesture> singleGestureSet = new HashSet<>();
        for (GestureData gestureData : gestures.getGestures()) {
            File gestureFile = saveDataToFile(gestureData);
            createAndSaveSingleGesture(singleGestureSet, gestureFile);
        }
        gesture.setGestures(singleGestureSet);
    }

    private File saveDataToFile(GestureData gestureData) throws IOException {
        File csvOutputFile = new File("gesture" + gestureData.hashCode() + ".csv");
        CSVPrinter csvPrinter = new CSVPrinter(new FileWriter(csvOutputFile), CSVFormat.EXCEL);
        for (HandData handData : gestureData.getGesture()) {
            csvPrinter.printRecord(handData.getData().values());
        }
        csvPrinter.close();
        return csvOutputFile;
    }

    private void createAndSaveSingleGesture(Set<SingleGesture> singleGestureSet, File gestureFile) throws IOException {
        SingleGesture singleGesture = new SingleGesture();
        singleGesture.setGestureData(FileUtils.readFileToByteArray(gestureFile));
        singleGestureSet.add(singleGesture);
        singleGestureRepository.save(singleGesture);
    }


    private void assignNewGestureToUser(User user, Gesture gesture) {
        gestureRepository.delete(user.getGesture());
        gestureRepository.save(gesture);
        user.setGesture(gesture);
        userRepository.save(user);
    }
}
