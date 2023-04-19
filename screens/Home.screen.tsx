import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  Image,
  StyleSheet, TouchableOpacity
} from "react-native";

import { Avatar, Colors, View, Text } from "react-native-ui-lib";

import FeedbackModal from "../components/FeedbackModal";
import useFeedback from "../hook/useFeedback";
import useUser from "../hook/useUser";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { clearLoginResponse } from "../redux/login/loginSlice";
import { newsList } from "../redux/newsList/api";
import { wait } from "../util/utils";
import HistoryCard from "../components/HistoryCard.component";
import { NewsShimmer } from "../components/NewsShimmer.component";
import { clearNewsResponse } from "../redux/newsList/newsListSlice";
import { Article } from "../redux/newsList/response";

export default function HomeScreen(props: any) {

  // Height and width of the device declared
  const { width, height } = Dimensions.get("window");

  const { showFeedback } = useFeedback();

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // News response from Redux
  const newsResponse = useAppSelector((state) => state?.newsListSlice?.response);

  // Loading status from redux
  const newsLoading = useAppSelector((state) => state?.newsListSlice?.loading);

  const loadNews = () => {
    // Clear All loaded news if it exists before loading new list
    dispatch(clearNewsResponse())

    // Load News from the Redux
    dispatch(newsList({}));
  };

  // Handle on list item click
  const handleOnClick = (item: Article) => {
    console.log(item);
  }

  // Handle on list refresh
  const onRefresh = React.useCallback(() => {

    // shows the refresh indicator
    setRefreshing(true);

    // Call the load news function
    loadNews();

    // waits 2 seconds before hidiing indicator
    wait(2000).then(() => setRefreshing(false));

  }, []);


  useEffect(() => {
    //Load news on component mounted
    loadNews();

  }, [])

  // Custom User Hook to get user information
  const { avatarName, fullname, email } = useUser();

  const [isOnline, setOnline] = useState<boolean>(true);


  // Google signout function
  const signOut = async () => {

    try {
      // Revoking google account access and signout
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      // Clearing Redux store
      dispatch(clearLoginResponse());

      // navigate to login
      props.navigation.replace("Login")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{ flex: 1, width }}>

      <View centerV marginH-s3 row style={{ marginTop: 20.0 }}>

        <Avatar
          containerStyle={styles.avatar}
          source={{ uri: avatarName }}
          size={50} />
        <View flex marginL-s3>
          <Text style={styles.userFullName}>{fullname}</Text>
          <Text style={styles.textStyle}>{email}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.signout}> Signout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>

        {newsLoading && <NewsShimmer />}

        {newsResponse != undefined && newsResponse?.articles != undefined && <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={newsResponse?.articles}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <HistoryCard item={item} onPressed={() => handleOnClick(item)} />
          )}
          keyExtractor={(item, index) => "key" + index}
        ></FlatList>}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10.0,
  },
  textStyle: {
    color: Colors.grey30
  },
  userFullName: {
    fontWeight: 'bold',
    color: Colors.grey20
  },
  signout: { fontWeight: 'bold', color: Colors.grey20 }

})
