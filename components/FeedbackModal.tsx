import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons  from "react-native-vector-icons/Ionicons";
import MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";

type FeedbackModalProp = {
  label: string;
  message: string;
  actionLabel: string;
  isVisible?: boolean;
  onModalClose?: () => void;
  type: "info" | "success" | "error";
  buttonType?: "double" | "single"
  onPress?: () => void;
  onCancel?: () => void;
};
export default function ({
  label,
  message,
  actionLabel,
  isVisible = true,
  type,
  buttonType = "single",
  onPress,
  onCancel,
  onModalClose
}: FeedbackModalProp) {
  const [modalVisible, setModalVisible] = useState(true);

  const handleOnPress = () => {
    setModalVisible(!modalVisible);

    onPress!();
  };

  const closeModal = () => {
    setModalVisible(false);
  }

  const typeColor: string =
    type === "info"
      ? "#ffa500"
      : type === "success"
        ? "#77C150"
        : type === "error"
          ? "red"
          : "#fff";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={buttonType == "double" ? isVisible : modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        if (typeof onModalClose !== 'undefined') {
          onModalClose!()
        }
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            opacity: 0.4,
            flexGrow: 2,
            backgroundColor: "#000",
          }}
        />

        <View
          style={{
            backgroundColor: "#fff",
            flexGrow: 0.46,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: `${typeColor}`,
              height: 70,
              marginTop: -29,
              justifyContent: "center",
              alignItems: "center",
              width: 70,
              marginBottom: 10,
              elevation: 20,
              borderRadius: 40,
            }}
          >
            {type === "success" ? (
              <Ionicons name="checkmark-sharp" size={34} color="white" />
            ) : type === "info" ? (
              <AntDesign name="infocirlceo" size={34} color="white" />
            ) : type === "error" ? (
              <MaterialIcons name="cancel" size={34} color="white" />
            ) : (
              ""
            )}
          </View>
          <Text semiboldT style={{ fontSize: 24, marginBottom: 10 }}>
            {label}
          </Text>
          <Text
            regularT
            style={{ fontSize: 18, textAlign: "center", paddingHorizontal: 10, paddingVertical: 5 }}
          >
            {message}
          </Text>

          <View style={{ flex: 1, width: "100%", justifyContent: "flex-end" }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
              <View
                marginT-s2
                style={{
                  backgroundColor: Colors.grey60,
                  height: 1,
                  marginBottom: 7,
                  width: "100%",
                }}
              />
              <View centerH row style={{ justifyContent: 'space-evenly' }}>

                {buttonType == "double" &&
                  <Text
                    semiboldT
                    style={{
                      fontSize: 15,
                      padding: 4,
                      paddingLeft: 13,
                      paddingRight: 13,
                      marginBottom: 14,
                      color: Colors.white,
                      borderRadius: 4,
                      backgroundColor: Colors.primaryColor,
                    }}
                    onPress={onCancel}
                  >
                    {"Close"}
                  </Text>}
                <Text
                  semiboldT
                  style={{
                    fontSize: 15,
                    padding: 4,
                    paddingLeft: 13,
                    paddingRight: 13,
                    marginBottom: 14,
                    color: Colors.white,
                    borderRadius: 4,
                    backgroundColor: Colors.primaryColor,
                  }}
                  onPress={handleOnPress}
                >
                  {actionLabel}
                </Text>

              </View>

            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
