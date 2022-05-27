import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { Component, useState, useEffect, useRef } from 'react';
import Container from './components/Container';
import RtcEngine, { VirtualBackgroundSourceStateReason, RtcRemoteView, VideoRenderMode, RtcLocalView,  VirtualBackgroundSource, VirtualBackgroundSourceType, Color, BitRate, VideoEncoderConfiguration, DegradationPreference } from 'react-native-agora';

export default class RtcView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peerIds : [],
            connectStatus: false,
            AgoraEngine: null,
            joined: false
        }
    }
    async componentDidMount() {
        const { notification } = this.props;
        this._engine = await RtcEngine.create(notification.providerId);
        this._engine.enableVideo();
        this._engine.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        this._engine.addListener('Error', (err) => {
            console.log('Error', err);
        });

        this._engine.addListener('RemoteVideoStateChanged', (uid, state, reason, elapsed) => {
            console.log('RemoteVideoStats', uid, state, reason, elapsed);
        });

        this._engine.addListener('UserJoined', (uid, elapsed) => {
                console.log('UserJoined', uid, elapsed);
                // If new user
                if (this.state.peerIds.indexOf(uid) === -1) {
                    this.setState({
                        peerIds: [...this.state.peerIds, uid]
                    })
                }
        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            this.setState({
                peerIds: this.state.peerIds.filter((id) => id !== uid)
            })
            this._engine.leaveChannel();
            this.props.onEnd(); // shouldn't emit event
        });

        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            this.setState({joined: true});
        });

        setTimeout(() => {
            this._engine?.joinChannel(notification.token, notification.roomName, null, 0);
        }, 1000);
        
    }

    endCall() {
        this._engine.leaveChannel();
        this.setState({joined: false});
        this.props.onEnd();

    }

    render() {
        if(this.state.joined) {
            return(
                <Container style={styles.container}>
                    {/* local view */}
                    <RtcLocalView.SurfaceView
                        style={{width:200, height:300, borderWidth:1}}
                        zOrderOnTop={ true }
                        channelId={this.props.notification.roomName}
                        renderMode={VideoRenderMode.Hidden} />
                    {/* remote view */}
                    {this.state.peerIds.map( (peerId , i) => {
                        return (
                            <RtcRemoteView.SurfaceView
                                key={i}
                                style={{width:200, height:300, borderWidth:1}}
                                uid={peerId}
                                channelId={this.props.notification.roomName}
                                renderMode={VideoRenderMode.Fit}
                                zOrderMediaOverlay={false}
                            />
                        )
                    })}

                    <TouchableOpacity style={styles.button} onPress={()=>this.endCall()}>
                        <Text>End</Text>
                    </TouchableOpacity>
                </Container>
            );
        }
        return(null);
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",
        alignItems:'center',
        justifyContent: "space-around",
        zIndex: 9
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding:10,
        width:'100%'
    },
    button: {
        padding:10,
        backgroundColor: 'blue'
    }
});