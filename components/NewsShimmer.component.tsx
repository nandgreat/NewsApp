import React from "react";
import { Colors, Text, View } from "react-native-ui-lib";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export function NewsShimmer() {
    return (
        <View marginH-s4>
            <SkeletonPlaceholder backgroundColor={Colors.grey50}>
                <View>
                    <View style={{ marginLeft: 0, marginTop: 20 }}>
                        <View style={{ width: "100%", height: 50, borderRadius: 8.0 }} />
                        <View style={{ marginTop: 6, width: "50%", height: 20, borderRadius: 5 }} />
                    </View>
                    <View style={{ marginLeft: 0, marginTop: 20 }}>
                        <View style={{ width: "100%", height: 50, borderRadius: 8.0 }} />
                        <View style={{ marginTop: 6, width: "50%", height: 20, borderRadius: 5 }} />
                    </View>
                    <View style={{ marginLeft: 0, marginTop: 20 }}>
                        <View style={{ width: "100%", height: 50, borderRadius: 8.0 }} />
                        <View style={{ marginTop: 6, width: "50%", height: 20, borderRadius: 5 }} />
                    </View>
                    <View style={{ marginLeft: 0, marginTop: 20 }}>
                        <View style={{ width: "100%", height: 50, borderRadius: 8.0 }} />
                        <View style={{ marginTop: 6, width: "50%", height: 20, borderRadius: 5 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>
    )
}
