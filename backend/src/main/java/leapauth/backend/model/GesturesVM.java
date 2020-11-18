package leapauth.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class GesturesVM {
    private List<GestureData> gestures;

    public GesturesVM(List<GestureData> gestureDataList) {
        this.gestures = gestureDataList;
    }
}
