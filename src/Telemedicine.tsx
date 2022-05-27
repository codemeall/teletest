import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import Container from './components/Container';

interface ITelemedicine {
    url: string
}

const Telemedicine = ( props: ITelemedicine ) => {
    return (
        <Container>
            <View style={styles.container}>
                <WebView
                    source={{
                        uri: props.url,
                    }}
                    style={styles.container} />
            </View>
        </Container>
    );
}

export default Telemedicine;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        zIndex: 8
        // flex: 1
    }
});