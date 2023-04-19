import React, { useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Overlayloader() {
  const scale = useSharedValue(0.5);

  const style = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    []
  );

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(0.8, { duration: 600, easing: Easing.ease }),
      -1,
      true
    );
  }, []);
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.overlay}>
        <Animated.Image
          source={require("../assets/loading_logo.png")}
          style={style}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
