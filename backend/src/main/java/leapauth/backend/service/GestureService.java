package leapauth.backend.service;

import leapauth.backend.model.*;
import leapauth.backend.repository.GestureRepository;
import leapauth.backend.repository.UserRepository;
import leapauth.backend.service.exception.MissingCurrentUserException;
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
        Optional<User> foundCurrentUser = SecurityUtils.getCurrentUser();
        if (foundCurrentUser.isEmpty()) {
            throw new MissingCurrentUserException();
        }
        User user = foundCurrentUser.get();
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
                precision = dtw > precision ? dtw : precision;
            }
        }
        gesture.setGesturePrecision(precision);
    }

    private void deletePreviousGesture(User user) {
        Gesture previousGesture = user.getGesture();
        if (previousGesture != null)
            gestureRepository.delete(previousGesture);
    }
}
