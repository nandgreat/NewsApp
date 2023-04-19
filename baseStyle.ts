import { Colors, Typography } from "react-native-ui-lib";

Colors.loadColors({
  primaryColor: "#0E8A3B",
  secondaryColor: "#BC905E",
  pink: "#E93F44",
  yellow: "#F2DA57",
});

Typography.loadTypographies({
  buttonTextApperence: {
    fontSize: 15,
    fontWeight: "300",
    fontFamily: "m-semibold",
    textTransform: "capitalize",
  },
  textRegular: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "m-regular",
  },
  textSemibold: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "m-semibold",
  },
  textBold: {
    fontSize: 15,
    fontWeight: "300",
    fontFamily: "m-bold",
  },
});
