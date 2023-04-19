import Ionicons from "react-native-vector-icons/Ionicons";
import { Constants } from "react-native-ui-lib";
import React from "react";
import { Colors, Text, View } from "react-native-ui-lib";
import { Platform } from "react-native";

export default function Header(stackProps: any) {
  const isDrawer = stackProps?.options.drawerActiveBackgroundColor;

  return (
    <View
      centerV
      style={{
        height: 58,
        marginTop: Platform.OS == "ios" ? Constants.statusBarHeight : 0,
        backgroundColor: Colors.white,
      }}
    >
      <View marginT-s4 centerV row spread paddingR-s5 paddingL-s3>
        <View row centerV>
          <Ionicons
            name={isDrawer ? "menu-outline" : "arrow-back-outline"}
            size={24}
            onPress={() =>
              isDrawer
                ? stackProps.navigation.toggleDrawer()
                : stackProps.navigation.goBack()
            }
            color={Colors.secondaryColor}
          />
          <Text semiboldT style={{ fontSize: 17, paddingLeft: 25 }}>
            {stackProps.options.headerTitle ?? stackProps.route.name}
          </Text>
        </View>

        {/* {stackProps.route.name == "History" &&
          <View row centerV>
            <Ionicons
              name={"filter"}
              size={24}
              onPress={() => stackProps.navigation.navigate("FilterHistory")}
              color={Colors.secondaryColor}
            /><Text marginL-s3>Filter</Text>
          </View>} */}
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: "flex-end",
          backgroundColor: Colors.yellow,
          height: 1.5,
          width: "100%",
        }}
      />
      <View
        style={{
          alignItems: "flex-end",
          backgroundColor: Colors.primaryColor,
          height: 1.5,
          width: "100%",
        }}
      />
      <View
        style={{
          alignItems: "flex-end",
          backgroundColor: Colors.secondaryColor,
          height: 1.5,
          width: "100%",
        }}
      />
    </View>
  );
}
