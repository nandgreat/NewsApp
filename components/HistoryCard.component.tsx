import React from "react";
import { Card, Text, View } from "react-native-ui-lib";
import { Article } from "../redux/newsList/response";
import { StyleSheet, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


type Props = {
  item: Article;
  onPressed: () => void;
};
const HistoryCard = ({ item, onPressed }: Props) => {
  return (
    <>
      <Card
        elevation={10}
        onPress={onPressed}
        style={styles.card}
      >
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
          <View flex marginL-s2 style={{justifyContent: 'flex-start', height:"100%"}}>
            <Text semiboldT style={{ paddingBottom: 3, fontWeight: 'bold' }}>
              {item?.title}
            </Text>
          </View>
        </View>
        <View center padding-s2>
          <MaterialIcons name="comment" size={34} color="grey" />
        </View>
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
