# leapauth

Bachelor of Engineering Thesis. The application uses a LeapMotion sensor that
scans the position of a hand in three-dimensional space. The user can save the
hand gesture and then use it as an authorization method. For this purpose, the
Dynamic Time Warping algorithm was used. Technologies used in the project
are Java with Spring Boot framework and TypeScript with Angular framework
and LeapMotion libraries

Video below presents functions of the application. At the beginning user tries to authorize with invalid gesture. Later, with proper gesture, he gains access to simple panel that allows him to see his current gesture animation, change gesture / password or check authorization stats. Later on, video presents administrator panel. Administrator can see other users gestures, check latest login attempts or change "system properties" - login ban duration and gesture precision - value after exceeding which authorization will be marked as failed.   


<video src="https://user-images.githubusercontent.com/48178457/152445293-da9ee19f-6871-4296-b290-67e1ea04555b.mp4">
