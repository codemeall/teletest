import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


const Chat = () => {
    return (
        <View style={styles.container}>
            <Text>Chat Component</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Chat;