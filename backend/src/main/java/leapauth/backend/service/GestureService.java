package leapauth.backend.service;

import leapauth.backend.model.*;
import leapauth.backend.repository.GestureRepository;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.util.SecurityUtils;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.io.input.CharSequenceReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.util.*;

@Service
@EnableAsync
public class GestureService {

    private UserRepository userRepository;
    private GestureRepository gestureRepository;
    private LeapAuthorizationService leapAuthorizationService;

    @Autowired
    public GestureService(UserRepository userRepository, GestureRepository gestureRepository,
                          @Lazy LeapAuthorizationService leapAuthorizationService) {
        this.userRepository = userRepository;
        this.gestureRepository = gestureRepository;
        this.leapAuthorizationService = leapAuthorizationService;
    }

    public List<Double[]> readGestureFromFile(byte[] gestureFile) throws IOException {
        Reader reader = new CharSequenceReader(new String(gestureFile));
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(reader);
        List<Double[]> gestureData = new ArrayList<>();
        for (CSVRecord csvRecord : records) {
            int size = csvRecord.size();
            Double[] frameValues = new Double[size];
            for (int i = 0; i < size; i++) {
                frameValues[i] = Double.parseDouble(csvRecord.get(i));
            }
            normalizeValues(frameValues);
            gestureData.add(frameValues);
        }
        return gestureData;
    }

    public byte[] getVisualization(Long userId) {
        User user;
        if (userId != null && userId != 0 && SecurityUtils.isCurrentUserAdmin()) {
            Optional<User> foundUser = userRepository.findById(userId);
            if (foundUser.isPresent()) {
                user = foundUser.get();
                return getUserVisualization(user);
            }
            throw new RuntimeException("Couldn't find such user");
        }
        user = SecurityUtils.getCurrentUser();
        return getUserVisualization(user);
    }

    private byte[] getUserVisualization(User user) {
        Gesture gesture = user.getGesture();
        if (gesture != null) {
            return gesture.getVisualisation();
        } else {
            throw new RuntimeException("Gesture doesn't exist");
        }
    }

    public List<Double[]> readGestureDataFromBrowser(List<HandData> handDataList) {
        List<Double[]> gestureData = new ArrayList<>();
        for (HandData data : handDataList) {
            Collection<Double> frameData = data.getData().values();
            Double[] frameDoubleArray = frameData.toArray(new Double[0]);
            normalizeValues(frameDoubleArray);
            gestureData.add(frameDoubleArray);
        }
        return gestureData;
    }

    private void normalizeValues(Double[] frameValues) {
        List<Double> frameValuesList = Arrays.asList(frameValues);
        double min = Collections.min(frameValuesList);
        double max = Collections.max(frameValuesList);
        for (int i = 0; i < frameValues.length; i++) {
            frameValues[i] = (frameValues[i] - min) / (max - min);
        }
    }

    public void saveUserGesture(GesturesVM gesturesVM, MultipartFile gestureVisualization) throws IOException {
        User user = SecurityUtils.getCurrentUser();
        Gesture gesture = createGesture(gesturesVM, gestureVisualization);
        deletePreviousGesture(user);
        user.setGesture(gesture);
        userRepository.save(user);
    }

    private Gesture createGesture(GesturesVM gesturesVM, MultipartFile gestureVisualization) throws IOException {
        Gesture gesture = new Gesture();
        gesture.setVisualisation(gestureVisualization.getBytes());
        for (GestureData gestureData : gesturesVM.getGestures()) {
            gesture.addSingleGesture(createSingleGesture(gestureData));
        }
        calculateAndSetGesturePrecision(gesture);
        return gesture;
    }

    private SingleGesture createSingleGesture(GestureData gestureData) throws IOException {
        ByteArrayOutputStream outputStream = prepareData(gestureData);
        SingleGesture singleGesture = new SingleGesture();
        singleGesture.setGestureData(outputStream.toByteArray());
        return singleGesture;
    }

    private ByteArrayOutputStream prepareData(GestureData gestureData) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        CSVPrinter csvPrinter = new CSVPrinter(new OutputStreamWriter(outputStream), CSVFormat.EXCEL);
        for (HandData handData : gestureData.getGesture()) {
            csvPrinter.printRecord(handData.getData().values());
        }
        csvPrinter.close();
        return outputStream;
    }

    private void calculateAndSetGesturePrecision(Gesture gesture) throws IOException {
        List<SingleGesture> gestures = gesture.getGestures();
        int size = gestures.size();
        double precision = 0;
        for (int i = 0; i < size; i++) {
            for (int j = i; j < size; j++) {
                List<Double[]> firstGesture = readGestureFromFile(gestures.get(i).getGestureData());
                List<Double[]> secondGesture = readGestureFromFile(gestures.get(j).getGestureData());
                double dtw = leapAuthorizationService.dynamicTimeWarp(firstGesture, secondGesture);
                precision = Math.max(dtw, precision);
            }
        }
        gesture.setGesturePrecision(precision);
    }

    private void deletePreviousGesture(User user) {
        Gesture previousGesture = user.getGesture();
        if (previousGesture != null)
            gestureRepository.delete(previousGesture);
    }

    public Gesture get(long userId) {
        User user;
        Gesture gesture;
        if (userId != 0 && SecurityUtils.isCurrentUserAdmin()) {
            Optional<User> foundUser = userRepository.findById(userId);
            if (foundUser.isPresent()) {
                user = foundUser.get();
                gesture = user.getGesture();
            } else {
                throw new RuntimeException("Couldn't find such user");
            }
        } else {
            user = SecurityUtils.getCurrentUser();
            gesture = user.getGesture();
        }
        if (gesture != null) {
            return gesture;
        }
        throw new RuntimeException("Gesture doesn't exist");
    }
}
