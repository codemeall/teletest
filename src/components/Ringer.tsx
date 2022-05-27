import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Container from './Container';

interface IRinger {
    onDecline?: ()=>void,
    onAccept?: ()=>void
}

const Ringer = (props: IRinger) => {
    return (
        <Container style={styles.container}>
            <Text>Ringer Component</Text>
            <View style={styles.buttonView}>
                
                <TouchableOpacity onPress={props.onDecline}>
                    <Text>Decline</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={props.onAccept}>
                    <Text>Accept</Text>
                </TouchableOpacity>
            
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",
        alignItems:'center',
        justifyContent: "space-around",
        zIndex:9
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding:10,
        width:'100%'
    }
});

export default Ringer;