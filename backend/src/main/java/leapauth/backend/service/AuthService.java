package leapauth.backend.service;

import leapauth.backend.model.HandData;
import leapauth.backend.model.UserAuthSession;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    private List<UserAuthSession> userAuthSessions = new ArrayList<>();

    public void processFrameData(String userId, HandData handData) {
        UserAuthSession userAuthSession = getUserAuthSessionOrCreateNew(userId);
        userAuthSession.addFrameDataToList(handData);
        userAuthSession.authorizeGestureIfPossible();
    }

    private UserAuthSession getUserAuthSessionOrCreateNew(String userId) {
        Optional<UserAuthSession> foundSession = userAuthSessions
                .stream()
                .filter(authSession -> authSession.getUserId().equals(userId))
                .findFirst();
        UserAuthSession userAuthSession;
        if (foundSession.isPresent()) {
            userAuthSession = foundSession.get();
        } else {
            userAuthSession = new UserAuthSession();
        }
        return userAuthSession;
    }
}
