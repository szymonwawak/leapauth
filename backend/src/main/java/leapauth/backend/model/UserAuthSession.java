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
    private List<HandFrameData> handFrameDataList = new ArrayList<>();

    public void addFrameDataToList(HandFrameData handFrameData) {
        handFrameDataList.add(handFrameData);
    }

    public void authorizeGestureIfPossible() {
        if (handFrameDataList.size() > 6) {
            //TODO: performAuthentication
        }
    }
}
