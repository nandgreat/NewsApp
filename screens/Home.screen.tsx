import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet, Text, TouchableOpacity
} from "react-native";

import { Avatar, Colors, View } from "react-native-ui-lib";

import FeedbackModal from "../components/FeedbackModal";
import useFeedback from "../hook/useFeedback";
import useUser from "../hook/useUser";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { clearLoginResponse } from "../redux/login/loginSlice";

export default function HomeScreen(props: any) {

  // Height and width of the device declared
  const { width, height } = Dimensions.get("window");

  const { showFeedback } = useFeedback();

  const dispatch = useAppDispatch();

  // Login response gotten from redux
  const loginResponse = useAppSelector((state) => state?.loginSlice?.response);

  // User Hook to get user information
  const { avatarName, fullname, email } = useUser();


  // Google signout function
  const signOut = async () => {

    try {
      // Revoking google account access and signout
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      // Clearing Redux store
      dispatch(clearLoginResponse());

      // navigate to login
      props.navigation.replace("Login")
    } catch (error) {
      console.error(error);
    }
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <View
      style={{ flex: 1, width }}>

      <View centerV marginH-s3 row style={{ marginTop: 20.0 }}>

        <Avatar
          containerStyle={styles.avatar}
          source={{ uri: avatarName }}
          size={50} />
        <View flex marginL-s3>
          <Text style={styles.userFullName}>{fullname}</Text>
          <Text style={styles.textStyle}>{email}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.signout}> Signout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FeedbackModal
        label="Setup transaction pin"
        type="info"
        buttonType="double"
        isVisible={showModal}
        message={"Please Setup Pin to continue"}
        actionLabel="Proceed"
        onPress={() => {
          setShowModal(false);

          props.navigation.navigate("SetupPinScreen");
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10.0,
  },
  textStyle: {
    color: Colors.grey30
  },
  userFullName: {
    fontWeight: 'bold',
    color: Colors.grey20
  },
  signout: { fontWeight: 'bold', color: Colors.grey20 }

})
