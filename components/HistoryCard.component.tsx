import React from "react";
import { Card, Text, View } from "react-native-ui-lib";
import { Article } from "../redux/newsList/response";
import { StyleSheet, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { dateToYMD } from "../util/utils";
import { TouchableOpacity } from "react-native-gesture-handler";


type Props = {
  item: Article;
  onPressed: () => void;
  onCommentPress: () => void;
};
const HistoryCard = ({ item, onPressed, onCommentPress }: Props) => {
  return (
    <>
      <Card
        elevation={10}
        style={styles.card}
      >
        <TouchableOpacity onPress={onPressed}>
          <View
            flex
            row
            style={{ alignItems: "center" }}
          >
            <View>
              {item?.urlToImage != undefined &&
                <Image
                  resizeMode="cover"
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: item?.urlToImage,
                  }}
                />}
              {item?.urlToImage == undefined &&
                <Image
                  resizeMode="cover"
                  style={{ width: 100, height: 100 }}
                  source={require("../assets/placeholder_image.png")}
                />}
            </View>
            <View flex marginL-s2 style={{ justifyContent: 'space-between', height: "100%" }}>
              <Text semiboldT style={{ paddingBottom: 3, fontWeight: 'bold' }}>
                {item?.title}
              </Text>
              <Text semiboldT>
                {dateToYMD(new Date(item.publishedAt))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCommentPress}>
          <View center row padding-s2>
            <View marginR-s2>
              <MaterialIcons name="comment" size={20} color="grey" />
            </View>
            <Text>Comment</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    paddingVertical: 10.0,
    marginHorizontal: 10.0,
    marginVertical: 8.0,
    borderRadius: 10,
  },
  image: {

  }
})

export default React.memo(HistoryCard);
