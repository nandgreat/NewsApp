import React, { useEffect } from "react";
import { Dimensions, StatusBar, Image } from "react-native";
import { Button, Colors, View } from "react-native-ui-lib";
import useFeedback from "../hook/useFeedback";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import { TouchableOpacity } from "react-native-gesture-handler";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { login } from "../redux/login/api";
import SocialLoginBtn from "../components/SociaLoginBtn.component";


export default function Login(props: any) {
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useAppDispatch();
  const loginResponse = useAppSelector((state) => state?.loginSlice?.response);
  const loginError = useAppSelector((state) => state?.loginSlice.error);
  const { showFeedback } = useFeedback();


  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  // Function that initiates the login in redux
  const GoogleSingUp = async () => {
    dispatch(login({}))
  };

  // Function to configure Google signin 
  const _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: "35090840121-mg66r1h6s97dhpqmih6fgdce76phguat.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }

  useEffect(() => {

    // Google signin configuration function call on mounted
    _configureGoogleSignIn();

  }, []);

  useEffect(() => {
    if (loginResponse == undefined) return; 

    // Navigate to Home screen if user is logged in
    if (loginResponse.user != undefined) props.navigation.replace("HomeScreen")

  }, [loginResponse])

  useEffect(() => {
    if (loginError == undefined) return;

    // Show feedback when there's an error
    showFeedback('danger', "Login Error");
    console.log(loginError);

  }, [loginError])

  return (
    <View
      style={{ flex: 1, width: screenWidth }}
    >
      <View flex style={{ marginTop: 40 }}>

        <View center style={{ marginTop: 40 }}>

        <SocialLoginBtn type="google" onPress={GoogleSingUp} />
        <SocialLoginBtn type="facebook" onPress={onFacebookButtonPress} />

        </View>
      </View>

      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
    </View>
  );
}

