import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Avatar, Text, Colors, View } from "react-native-ui-lib";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParamList ";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { hideKeyboard, slugifyString } from "../util/utils";
import useUser from "../hook/useUser";
import UserComment from "../components/UserComment.component";
import useFeedback from "../hook/useFeedback";
import { useAppDispatch } from "../redux/hook";
import { sendNotification } from "../redux/push_notification/api";
import { SendNotificationPayload } from "../redux/push_notification/request";
import Feather from "react-native-vector-icons/Feather";


type NewsDetailsRouteProps = RouteProp<RootStackParamList, "CommentScreen">;

let userId: string | null = '';

export default function CommentScreen(props: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  const route = useRoute<NewsDetailsRouteProps>();

  const [currentCommentId, setCurrentCommentId] = useState<{ commentId: string, author: string }>();

  const { avatarName, fullname } = useUser()

  const inputRef = useRef(null);

  const handleFocus = () => {
    hideKeyboard()
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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

    if (currentCommentId != undefined) {
      addReply(currentCommentId)
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
    setCurrentCommentId(undefined)
  };

  const onReplyClicked = (currentCommentId: string, author: string) => {
    handleFocus();
    setCurrentCommentId({ commentId: currentCommentId, author: author })
  }

  // Function to handle replies on comment
  const addReply = (comment: { commentId: string; author: string }) => {

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Get the Firebase node to push to 
    const commentRef = firestore().collection('news').doc(newsId).collection('comments').doc(comment.commentId);
    commentRef.update({
      replies: firebase.firestore.FieldValue.arrayUnion({
        text: newComment,
        author: fullname,
        image: avatarName,
        timestamp: new Date(),
      }),
    }).then(() => {
      sendPushNotification()
    });
    setNewComment("")
    setCurrentCommentId(undefined)
  };
  const [replyText, setReplyText] = useState("");

  // Component to display all the comments 
  const renderComment = (comment) => {
    return (
      <View key={comment.id} style={{ paddingLeft: 16 }}>
        <UserComment text={comment.text} author={comment.author} image={comment.image} onReplyClicked={() => onReplyClicked(comment.id, comment.author)} />
        {comment.replies.map((reply) => (
          <View key={reply.timestamp.toDate().toString()} style={{ paddingLeft: 20, marginTop: 15.0 }}>
            <UserComment text={reply.text} author={reply.author} image={reply.image} onReplyClicked={() => onReplyClicked(comment.id, comment.author)} />
          </View>
        ))}

      </View>
    );
  };

  return (
    <View flex>
      <View>
        {comments.map((comment) => renderComment(comment))}
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        {currentCommentId &&
          <View row padding-s4 spread backgroundColor={Colors.grey50}>
            <View row>
              <Text color={Colors.grey10}>Replying to</Text><Text style={{ fontWeight: 'bold' }}> {currentCommentId?.author}</Text>
            </View>
            <View>
              <Feather name="x" size={20} color="grey" onPress={() => setCurrentCommentId(undefined)} /></View>
          </View>}
        <View row>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Add comment"
              ref={inputRef}
              style={{ backgroundColor: 'white', color: Colors.grey30, flex: 1, paddingHorizontal: 10.0 }}
              placeholderTextColor={Colors.grey40}
              value={newComment}
              onChangeText={setNewComment}
              onSubmitEditing={addComment}
            />
          </View>
          <Text onPress={addComment} style={{ fontSize: 20.0, padding: 20.0, backgroundColor: Colors.grey40 }}>Send</Text>
        </View>
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

