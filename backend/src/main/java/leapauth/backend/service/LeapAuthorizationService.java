package leapauth.backend.service;

import leapauth.backend.model.Gesture;
import leapauth.backend.model.HandData;
import leapauth.backend.model.SingleGesture;
import leapauth.backend.model.User;
import leapauth.backend.service.exception.MissingGestureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeapAuthorizationService {

    private GestureService gestureService;
    private StatsService statsService;
    private SystemPropertiesService systemPropertiesService;

    private final int MAX_NUMBER_OF_WARPS = 40;

    @Autowired
    public LeapAuthorizationService(GestureService gestureService, StatsService statsService,
                                    SystemPropertiesService systemPropertiesService) {
        this.gestureService = gestureService;
        this.statsService = statsService;
        this.systemPropertiesService = systemPropertiesService;
    }

    public boolean recognizeGesture(User user, List<HandData> gestureData) {
        Gesture userGesture = user.getGesture();
        if (userGesture == null) {
            throw new MissingGestureException();
        }
        List<SingleGesture> singleGestures = userGesture.getGestures();
        List<Double[]> currentGesture = gestureService.readGestureDataFromBrowser(gestureData);
        List<Double[]> savedGesture;
        double gestureDifference = 0;
        for (SingleGesture singleGesture : singleGestures) {
            try {
                savedGesture = gestureService.readGestureFromFile(singleGesture.getGestureData());
                gestureDifference = dynamicTimeWarp(currentGesture, savedGesture) / userGesture.getGesturePrecision();
                if (gestureDifference < systemPropertiesService.getSystemProperties().getGesturePrecision()) {
                    statsService.addLoginAttempt(true, gestureDifference, user);
                    return true;
                }
            } catch (Exception ignore) {
            }
        }
        statsService.addLoginAttempt(false, gestureDifference, user);
        return false;
    }

    public double dynamicTimeWarp(List<Double[]> gestureA, List<Double[]> gestureB) {
        int gestureALength = gestureA.size();
        int gestureBLength = gestureB.size();
        int warps = Math.max(MAX_NUMBER_OF_WARPS, Math.abs(gestureALength - gestureBLength));
        double[][] distanceMatrix = new double[gestureALength + 1][gestureBLength + 1];
        fillMatrixWithInf(gestureALength, gestureBLength, distanceMatrix);
        fillPartOfMatrixWithZeros(gestureALength, gestureBLength, warps, distanceMatrix);
        addZerosToFirstColumnOfMatrix(gestureALength, distanceMatrix);
        fillMatrixWithDistanceCost(gestureA, gestureB, gestureALength, gestureBLength, warps, distanceMatrix);
        return getWarpingPath(distanceMatrix);
    }

    private void fillMatrixWithInf(int gestureALength, int gestureBLength, double[][] distanceMatrix) {
        for (int i = 0; i < gestureALength + 1; i++) {
            for (int j = 0; j < gestureBLength + 1; j++) {
                distanceMatrix[i][j] = Double.POSITIVE_INFINITY;
            }
        }
    }

    private void fillPartOfMatrixWithZeros(int gestureALength, int gestureBLength, int warps, double[][] distanceMatrix) {
        distanceMatrix[0][0] = 0;
        for (int i = 1; i < gestureALength + 1; i++) {
            for (int j = Math.max(1, i - warps); j < Math.min(gestureBLength, i + warps) + 1; j++) {
                distanceMatrix[i][j] = 0;
            }
        }
    }

    private void addZerosToFirstColumnOfMatrix(int gestureALength, double[][] distanceMatrix) {
        for (int i = 0; i < gestureALength; i++) {
            distanceMatrix[i][0] = 0;
        }
    }

    private void fillMatrixWithDistanceCost(List<Double[]> gestureA, List<Double[]> gestureB, int gestureALength, int gestureBLength, int warps, double[][] distanceMatrix) {
        for (int i = 1; i < gestureALength + 1; i++) {
            for (int j = Math.max(1, i - warps); j < Math.min(gestureBLength, i + warps) + 1; j++) {
                double cost = calculateCost(gestureA.get(i - 1), gestureB.get(j - 1));
                double lastMin = Math.min(Math.min(distanceMatrix[i - 1][j], distanceMatrix[i][j - 1]), distanceMatrix[i - 1][j - 1]);
                distanceMatrix[i][j] = cost + lastMin;
            }
        }
    }

    private double getWarpingPath(double[][] matrix) {
        int lastIndex = matrix[0].length - 1;
        double min = Double.POSITIVE_INFINITY;
        int index = 0;
        for (int i = 0; i < matrix.length; i++) {
            double[] data = matrix[i];
            if (data[lastIndex - 1] < min) {
                min = data[lastIndex - 1];
                index = i;
            }
        }
        int pathCounter = 0;
        while (lastIndex > 0) {
            if (matrix[index - 1][lastIndex] < matrix[index - 1][lastIndex - 1] && matrix[index - 1][lastIndex] < (matrix[index][lastIndex - 1])) {
                index--;
            } else if (matrix[index][lastIndex - 1] < matrix[index - 1][lastIndex - 1] && matrix[index][lastIndex - 1] < (matrix[index - 1][lastIndex])) {
                lastIndex--;
            } else {
                lastIndex--;
                index--;
            }
            pathCounter++;
        }
        return min / pathCounter;
    }

    private double calculateCost(Double[] frameA, Double[] frameB) {
        double cost = 0.0;
        int length = frameA.length;
        for (int i = 0; i < length; i++) {
            cost += Math.abs(frameA[i] - frameB[i]);
        }
        return cost;
    }
}
