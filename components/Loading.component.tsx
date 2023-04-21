import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import { Appearance } from "react-native";
import { Colors, View } from "react-native-ui-lib";
import { colorsPalette } from "react-native-ui-lib/src/style/colorsPalette";

export default function Loading({ size = 90 }: { size?: number }) {
  const colorScheme = Appearance.getColorScheme();
  return (
    <View flex center>
      <LottieView
        autoPlay
        loop
        source={require("../assets/default.json")}
        style={{ width: size, height: size }}
      />
    </View>
  );
}
