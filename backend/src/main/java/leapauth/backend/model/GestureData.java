package leapauth.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class GestureData {
    private List<HandData> gesture;

    public GestureData(List<HandData> gestureFramesData) {
        this.gesture = gestureFramesData;
    }
}
