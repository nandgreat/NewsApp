import NetInfo from "@react-native-community/netinfo";
import { Keyboard } from "react-native";
import EncryptedStorage from 'react-native-encrypted-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.log("There was an error" + error.toString());

  }
};

export const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function dateToYMD(date) {
  var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var d = date.getDate();
  var m = strArray[date.getMonth()];
  var y = date.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + ' ' + m + ' ' + y;
}

export async function retrieveItem(key: string) {
  try {
    const session = await EncryptedStorage.getItem(key);

    if (session !== undefined) {

      return session;
    }
  } catch (error) {
    // There was an error on the native side
    return error.toString();
  }
}

export const slugifyString = str => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');

export async function storeItem(key: string, item: any) {
  try {
    await EncryptedStorage.setItem(key, item);
  } catch (error) {
    console.log("There was an error" + error.toString());

  }
}

export const currencyFormat = (num: any) => {
  return "₦" + num!.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const validateTextInput = (text: any) => {
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;

  return !format.test(text);
}

export const validatePassword = (myInput: string) => {

  let validateLowerAndUpper = false;
  let validateNumber = false;
  let validateLength = false;
  let validateSpecialCharacters = false;

  // Validate lowercase and uppercase letters
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.match(lowerCaseLetters) && myInput.match(upperCaseLetters)) validateLowerAndUpper = true;

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.match(numbers)) validateNumber = true;

  // Validate numbers
  var specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
  if (myInput.match(specialCharacters)) validateSpecialCharacters = true;

  // Validate length
  if (myInput.length >= 8) validateLength = true;

  var validateAll = validateLowerAndUpper && validateSpecialCharacters && validateLength && validateNumber;

  return { validateLowerAndUpper, validateLength, validateSpecialCharacters, validateNumber, validateAll }

}


export const myCheckConnectivity = (): boolean => {
  // For Android devices

  let netStatus: boolean | null = false;

  // if (Platform.OS === "android") {

  //   NetInfo.fetch().then(state => {
  //     if (state.isConnected)
  //       netStatus = true;
  //     else return false;
  //   })
  // } else {
  //   netStatus = true;
  //   // For iOS devices
  //   // NetInfo.addEventListener(
  //   //   "connectionChange",
  //   //   this.handleFirstConnectivityChange
  //   // );
  // }

  return netStatus;
};

export const consoleLog = (content: any) => {
  if (__DEV__) {
    console.log(content);
  }
}


export const hideKeyboard = () => {
  Keyboard.dismiss()
}

export const CheckConnectivity = async (): Promise<boolean> => {
  // For Android devices

  return await NetInfo.fetch().then(state => {
    return state.isConnected!;
  });

};
