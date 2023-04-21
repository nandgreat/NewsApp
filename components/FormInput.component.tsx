import Feather from "react-native-vector-icons/Feather";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardTypeOptions, TextInput, Text } from "react-native";
import { Card, Colors, View } from "react-native-ui-lib";
import { useTheme } from "@react-navigation/native";

type Props = {
  label: string;
  type: KeyboardTypeOptions;
  disable?: boolean;
  height?: number;
  required?: boolean;
  autoFocus?: boolean;
  isLoading?: boolean;
  icon?: "eye" | "phone" | "user" | "mail" | "map-pin" | "lock" | "calendar" | "briefcase" | "home" | "search";
  placeholder?: string;
  maxLength?: number;
  noOfLines?: number;
  multipleLine?: boolean;
  isPassword?: boolean;
  onSuffixIconPress?: () => void;
  suffixIcon?: "eye" | "phone" | "user" | "mail" | "map-pin" | "lock" | "calendar" | "briefcase" | "home" | "chevron-down";
  defaultValue?: string;
  onChange?: (...event: any[]) => void;
  onChangeText?: (value: string) => void;
};

export default function FormInput({
  label,
  defaultValue,
  height = 55,
  isLoading,
  placeholder,
  icon,
  suffixIcon,
  onSuffixIconPress,
  noOfLines = 1,
  onChange,
  required = false,
  autoFocus = false,
  multipleLine = false,
  maxLength,
  isPassword,
  type,
  disable = false,
  onChangeText,
}: Props) {
  const [value, setValue] = useState<string>();
  const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
  const textInput = useRef<any>();
  useEffect(() => {
    if (!value) return;
    onChangeText!(value);
  }, [value]);

  const { colors } = useTheme();

  useEffect(() => {
    if (!placeholder) return;

    if (autoFocus)
      textInput.current.focus();
  }, [placeholder]);

  // <Feather name="eye" size={24}  color="black" />;

  return (

    <View marginT-s4>
      <View row>
        {required && <Text style={{ color: Colors.red10 }}>*</Text>}
      </View>
      <View
        row
        centerV
        style={{
          zIndex: 1,
          marginTop: 5,
          marginBottom: 2,
          paddingRight: 15,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          height: height,
          backgroundColor: colors.card,
          borderRadius: 30.0,
          elevation: 8.0,
          padding: 0,
          paddingLeft: 12,
        }}
      >
        <Feather
          name={icon}
          size={24}
          color={Colors.grey40}
          style={{ paddingRight: 8 }}
        />

        <TextInput
          style={{ flexGrow: 1, paddingRight: 0, fontSize: 16.0, fontFamily: 'Montserrat-Regular', marginRight: 30, color: Colors.textColorOnWhite }}
          placeholderTextColor={Colors.textColorOnWhite}
          value={defaultValue}
          maxLength={maxLength ?? 200}
          autoCompleteType="off"
          returnKeyType={'done'}
          secureTextEntry={isPassword && !passwordToggle}
          ref={textInput}
          onChangeText={onChange}
          autoFocus={false}
          multiline={multipleLine}
          numberOfLines={noOfLines}
          editable={!disable}
          placeholder={`${placeholder ? placeholder : label}`}
          keyboardType={type}

        />
        {isPassword && (
          <Feather
            name={passwordToggle ? "eye-off" : "eye"}
            size={24}
            color={Colors.grey40}
            onPress={() => setPasswordToggle(!passwordToggle)}
            style={{}}
          />
        )}
        {suffixIcon && (
          <Feather
            name={suffixIcon}
            size={24}
            color={Colors.grey40}
            onPress={onSuffixIconPress}
            style={{}}
          />
        )}
      </View>
    </View>
  );
}
