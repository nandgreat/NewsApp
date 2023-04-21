import React, {  } from "react";
import { Image, TouchableOpacity } from "react-native";

export default function SocialLoginBtn({ type, onPress }: { type: "google" | "facebook", onPress: () => void }) {

    // Render the comment and its child comments
    return (
        <TouchableOpacity onPress={onPress}  style={{marginBottom: 20.0}}>
            <Image
                source={type == "google" ? require("../assets/signin-button.png") : require("../assets/facebook_login_btn.png")}
                resizeMode="contain"
                style={{ width: 300, height: 50, }}
            />
        </TouchableOpacity>
    );
};


