import React from "react";
import { Dimensions, StatusBar, Image, Text, StyleSheet } from "react-native";
import { Colors, View } from "react-native-ui-lib";

import { Article } from "../redux/newsList/response";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList ";
import { dateToYMD } from "../util/utils";

type NewsDetailsRouteProps = RouteProp<RootStackParamList, "NewsDetailScreen">;

export default function NewsDetailScreen(props: any) {

  // Getting device screen width
  const screenWidth = Dimensions.get("window").width;

  // Route
  const route = useRoute<NewsDetailsRouteProps>();

  // Received The News Item from Previous page and assign to a variable
  const newItem: Article = route.params.newsItem;

  return (
    <View
      style={{ flex: 1, width: screenWidth }}>
      <View flex>

        {newItem?.urlToImage != undefined &&
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: newItem?.urlToImage,
            }}
          />}

        {newItem?.urlToImage == undefined &&
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require("../assets/placeholder_image.png")}
          />}

        <View margin-s3>
          <Text style={styles.title}>{newItem.title}</Text>
          <View row marginT-s3>
            <Text style={styles.otherText}>{"By " + newItem.author + " - " + dateToYMD(new Date(newItem.publishedAt))}</Text>
          </View>

          <View style={styles.line} />

          <View>
            <Text style={styles.otherText}>{newItem.description}</Text>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 300 },
  title: { fontSize: 20.0, fontWeight: 'bold', color: Colors.grey20 },
  otherText: { fontSize: 15.0, color: Colors.grey40 },
  line: { height: 1.0, marginVertical: 20.0, backgroundColor: Colors.grey50 }
})

