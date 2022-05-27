import { StyleSheet, Text, View, Dimensions, ViewStyle } from 'react-native';
import React from "react";
const { width, height } = Dimensions.get('window');

interface IContainer {
    children: React.ReactNode,
    style?: ViewStyle
}

const Container = (props: IContainer) => {
    return (
        <View
          {...props}
          style={[ styles.container, props.style ]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'absolute',
        height: height,
        width: width,
        zIndex:2,
        paddingVertical:20
    }
});

export default Container;