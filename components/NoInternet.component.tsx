import React from 'react'
import { View, Text, Image, Button } from 'react-native-ui-lib'

function NoInternet({ onRetry }: { onRetry: () => void }) {
    return (
        <View flex center paddingH-s5>

            <Image
                source={require("../assets/no_internet.png")}
                style={{ width: 250, height: 250 }}
                resizeMode="contain"
            />

            <Text semiBoldT style={{ fontSize: 25.0, fontWeight: 'bold', textAlign: 'center', marginTop: 20.0 }}>No internet connection</Text>

            <Button
                borderRadius={5}
                enableShadow={true}
                avoidMinWidth={false}
                animateLayout
                label={"Try Again"}
                onPress={onRetry}
                style={{
                    width: "60%",
                    marginTop: 30,
                    elevation: 30,
                }}
            />

        </View>
    )
}

export default NoInternet
