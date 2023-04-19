import LottieView from "lottie-react-native";
import React from "react";
import { Colors, View } from "react-native-ui-lib";

export default function Loading({ size = 90 }: { size?: number }) {
  return (
    <View flex center>
      <LottieView
        autoPlay
        loop
        source={require("../assets/lottie/loading.json")}
        style={{ width: size, borderColor: Colors.primaryColor, height: size }}
      />
    </View>
  );
}
