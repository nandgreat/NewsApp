import React from "react";
import { Text, View } from "react-native-ui-lib";

export default function ErrorLabel({ message }: { message: string }) {
  return (
    <View paddingL-s1>
      <Text red10 regularT>
        {message}
      </Text>
    </View>
  );
}
