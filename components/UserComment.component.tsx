import React, { useState } from "react";
import { Avatar, Colors, View, Text } from "react-native-ui-lib";

export default function UserComment({ text, author, image, onReplyClicked }) {

    // Define the Comment component
    const [comment, setComment] = useState('');
    const [childComments, setChildComments] = useState<any[]>([]);


    // Render the comment and its child comments
    return (
        <View>
            <View row>
                <Avatar
                    source={{ uri: image }}
                    size={35} />
                <View marginL-s2>
                    <Text style={{ color: Colors.grey10, fontWeight: 'bold' }}>{author}</Text>
                    <Text style={{ color: Colors.grey10 }}>{text}</Text>
                </View>
            </View>
            <Text marginL-s10 marginB-s4 onPress={onReplyClicked} color={Colors.grey40}>Reply</Text>
        </View>
    );
};


