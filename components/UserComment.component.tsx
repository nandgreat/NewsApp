import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Appearance, Button, Text, TextInput } from "react-native";
import { Avatar, Colors, View } from "react-native-ui-lib";
import { colorsPalette } from "react-native-ui-lib/src/style/colorsPalette";
import firestore from '@react-native-firebase/firestore';

export default function UserComment({ text, author, image }) {

    // Define the Comment component
    const [comment, setComment] = useState('');
    const [childComments, setChildComments] = useState<any[]>([]);


    // Render the comment and its child comments
    return (
        <View row>
            <Avatar
                source={{ uri: image }}
                size={35} />
            <View marginL-s2>
                <Text style={{ color: Colors.grey10, fontWeight: 'bold' }}>{author}</Text>
                <Text style={{ color: Colors.grey10 }}>{text}</Text>
            </View>
        </View>
    );
};


