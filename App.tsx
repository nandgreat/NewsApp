import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactNode, useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { Host } from "react-native-portalize";
import { Colors } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./baseComponent";
import "./baseStyle";
import Header from "./components/Header.component";
import store from "./redux/store";
import { navigationRef } from "./RootNavigator";
import HomeScreen from "./screens/Home.screen";
import History from "./screens/History.screen";
import Login from "./screens/Login.screen";
import { RootStackParamList } from "./screens/RootStackParamList ";
import { StatusBar } from "react-native";
import SplashScreen from 'react-native-splash-screen';

const App: () => ReactNode = () => {

  // Rootstack that declares all the App Routes initiantiated
  const RootStack = createStackNavigator<RootStackParamList>();

  let persistor = persistStore(store);

  useEffect(() => {

    // Hide Splash screen using Library
    SplashScreen.hide();

  }, []);

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <NavigationContainer ref={navigationRef}>
          <Host>
            <RootStack.Navigator initialRouteName="Login"> 
              <RootStack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: true,
                }}
              />

              <RootStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                  headerTitle: "",
                }}
              />

            </RootStack.Navigator>
          </Host>
          <FlashMessage position="top" />
          <StatusBar backgroundColor={Colors.transparent} barStyle={"default"} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
