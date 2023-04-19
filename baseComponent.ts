import { Colors, ThemeManager } from "react-native-ui-lib";
type TextProps = {
  boldT: boolean;
  regularT: boolean;
  semiboldT: boolean;
  mediumT: boolean;
};

type ButtonProps = {
  color: boolean;
};

// ThemeManager.setComponentForcedTheme("Button", {
//   backgroundColor: Colors.primaryColor,
//   buttonTextApperence: true,
//   color: "#fff",
//   borderRadius: 10,
// });

ThemeManager.setComponentTheme("Button", (props: ButtonProps, context: any) => {
  return {
    backgroundColor: Colors.primaryColor,
    buttonTextApperence: true,
    color: props.color ? "#000" : "#fff",
    borderRadius: 10,
  };
});

ThemeManager.setComponentTheme("Text", (props: TextProps, context: any) => {
  return {
    textRegular: props.regularT && true,
    textSemibold: props.semiboldT && true,
    textBold: props.boldT && true,
    textMedium: props.mediumT && true,
  };
});
