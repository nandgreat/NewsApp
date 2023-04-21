import React from "react";
import { ActivityIndicator, Modal, View, Text } from "react-native";

export const ProgressDialogComponent = ({ visible, progressText }) => (
    <Modal onRequestClose={() => null} visible={visible}>
        <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>{progressText}</Text>
                <ActivityIndicator size="large" />
            </View>
        </View>
    </Modal>
);