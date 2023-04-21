import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Appearance, Button, Text, TextInput } from "react-native";
import { Colors, View } from "react-native-ui-lib";
import { colorsPalette } from "react-native-ui-lib/src/style/colorsPalette";
import firestore from '@react-native-firebase/firestore';

export default function Comment({ commentId, parentId, level = 0 }) {

    // Define the Comment component
    const [comment, setComment] = useState('');
    const [childComments, setChildComments] = useState<any[]>([]);

    // Load the child comments from Firebase
    useEffect(() => {
        const commentsRef = firestore().collection('comments').where('parentId', '==', commentId);
        commentsRef.onSnapshot(documentSnapshot => {
            // console.log('User data: ', documentSnapshot.data());

            const comments: any = [];
            documentSnapshot.forEach((childSnapshot) => {
                const childComment = childSnapshot.data().val();
                console.log(childComment);

                comments.push(childComment);
            });
            setChildComments(comments);
        });

    }, []);

    // Save the comment to Firebase
    const handleAddComment = () => {
        const commentsRef = firestore().collection('comments');

        commentsRef.add({
            comment: comment,
            parentId: parentId,
            level: level + 1,
        });
        setComment('');
    };

    // Render the comment and its child comments
    return (
        <View style={{ marginLeft: level * 20 }}>
            <Text>{commentId}</Text>
            <Text>{comment}</Text>
            <TextInput value={comment} onChangeText={setComment} />
            <Button title="Add Comment" onPress={handleAddComment} />
            {childComments.map((childComment) => (
                <Comment key={childComment.id} commentId={childComment.id} parentId={commentId} level={level + 1} />
            ))}
        </View>
    );
};


