import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
}

export async function getFirebaseToken() {
    return await messaging().getToken();
}

export async function subscribeToGeneral() {
    messaging()
        .subscribeToTopic('general')
        .then(() => console.log('Subscribed to topic general!'));
}


export const notificationLister = (navigation) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        navigation.navigate("Login"); // Suposed to navigate to the Notification page
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                navigation.navigate("Login"); // Suposed to navigate to the Notification page

            }
            // setLoading(false);
        });

    messaging().onMessage(async remoteMessage => {
        console.log("----------------------------------- Firebase Foreground message -----------------------------------");
    });


    messaging().setBackgroundMessageHandler(async remoteMessage => {

        console.log("-======================Background Message ===========================-");
        console.log(remoteMessage);

    })
}