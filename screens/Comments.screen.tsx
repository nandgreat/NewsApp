import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput } from "react-native";
import { Avatar, Colors, View } from "react-native-ui-lib";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList ";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { slugifyString } from "../util/utils";
import useUser from "../hook/useUser";
import UserComment from "../components/UserComment.component";
import useFeedback from "../hook/useFeedback";
import { useAppDispatch } from "../redux/hook";
import { sendNotification } from "../redux/push_notification/api";
import { SendNotificationPayload } from "../redux/push_notification/request";

type NewsDetailsRouteProps = RouteProp<RootStackParamList, "CommentScreen">;

let userId: string | null = '';

export default function CommentScreen(props: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  const route = useRoute<NewsDetailsRouteProps>();

  const { avatarName, fullname } = useUser()

  const dispatch = useAppDispatch();

  const newsItem = route.params.newsItem;

  const { showFeedback } = useFeedback();

  const newsId = slugifyString(newsItem.title);

  useEffect(() => {
    // On start get all comments on this post from firestore collection 'news'
    const unsubscribe = firestore().collection('news').doc(newsId).collection("comments").onSnapshot((querySnapshot) => {
      const newComments: any[] = [];

      //loop through each and push to array 
      querySnapshot.forEach((doc) => {
        const comment: any = doc.data();
        comment.id = doc.id;
        newComments.push(comment);
      });
      setComments(newComments);
    });

    return () => unsubscribe();
  }, []);

  const sendPushNotification = () => {
    let payload: SendNotificationPayload = {
      notification: {
        body: `${fullname} Comment on your a Post`,
        title: "New Comment"
      },
      to: "/topics/general"
    };
    dispatch(sendNotification(payload))
  }


  // Function to add comment to firebase
  const addComment = () => {

    // Checks if comment was typed in
    if (newComment == '') {
      showFeedback("danger", "Enter comment to continue");
      return;
    }
    // Get the Firebase node to push to 
    const docRef = firestore().collection('news').doc(newsId).collection("comments").doc()
    docRef.set({
      text: newComment,
      author: fullname,
      image: avatarName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      replies: [],
    }).then(() => {
      sendPushNotification()
    });
    // Clear Comment after push
    setNewComment('');
  };

  // Function to handle replies on comment
  const addReply = (commentId, replyText) => {

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Get the Firebase node to push to 
    const commentRef = firestore().collection('news').doc(newsId).collection('comments').doc(commentId);
    commentRef.update({
      replies: firebase.firestore.FieldValue.arrayUnion({
        text: replyText,
        author: fullname,
        image: avatarName,
        timestamp: new Date(),
      }),
    }).then(() => {
      sendPushNotification()
    });
  };
  const [replyText, setReplyText] = useState("");

  // Component to display all the comments 
  const renderComment = (comment) => {
    return (
      <View key={comment.id} style={{ paddingLeft: 16 }}>
        <UserComment text={comment.text} author={comment.author} image={comment.image} />
        {comment.replies.map((reply) => (
          <View key={reply.timestamp.toDate().toString()} style={{ paddingLeft: 20, marginTop: 15.0 }}>
            <UserComment text={reply.text} author={reply.author} image={reply.image} />
          </View>
        ))}

        <TextInput
          placeholder="Reply"
          placeholderTextColor={Colors.grey40}
          style={{ color: Colors.grey10 }}
          value={replyText}
          onChangeText={setReplyText}
          onSubmitEditing={() => {
            addReply(comment.id, replyText);
            setReplyText('');
          }}
        />
      </View>
    );
  };

  return (
    <View flex>
      <View>
        {comments.map((comment) => renderComment(comment))}
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Add comment"
            style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10.0 }}
            placeholderTextColor={Colors.grey40}
            value={newComment}
            onChangeText={setNewComment}
            onSubmitEditing={addComment}
          />
        </View>
        <Text onPress={addComment} style={{ fontSize: 20.0, padding: 20.0, backgroundColor: Colors.grey40 }}>Send</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  image: { width: "100%", height: 300 },
  title: { fontSize: 20.0, fontWeight: 'bold', color: Colors.grey20 },
  otherText: { fontSize: 15.0, color: Colors.grey40 },
  inputLayout: {
    flexDirection: 'row',
    width: "100%",
    height: 60.0,
    position: "absolute",
    alignItems: 'center',
    paddingHorizontal: 10.0,
    bottom: 0.0,
    backgroundColor: "#FFFFFF"
  },
  line: { height: 1.0, marginVertical: 20.0, backgroundColor: Colors.grey50 }
})

