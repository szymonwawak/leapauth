package leapauth.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserAuthSession {
    private static int FRAMES_PER_SECOND = 12;
    private String userId;
    private List<HandData> handDataList = new ArrayList<>();

    public void addFrameDataToList(HandData handData) {
        handDataList.add(handData);
    }

    public void authorizeGestureIfPossible() {
        if (handDataList.size() > 6) {
            //TODO: performAuthentication
        }
    }
}
