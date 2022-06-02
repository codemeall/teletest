import React, { useEffect, useState, useReducer } from "react";
import { StyleSheet, Text } from 'react-native';

import { SANAR_EVENT_TYPE, CONNECTION_STATUS } from "./Types";
import { TELECALL, MESSAGE, ACCEPT_CALL, END_CALL, REJECT_CALL } from "./common/constants";

import Connection from "./Connection";
import Ringer from "./components/Ringer";
import RtcView from "./RtcView";
import Telemedicine from "./Telemedicine";

const SanarTelemedicine = ({
    connectUrl,
    uid, 
    did,
    connect, 
    sanarUrl,
    bookingView
}) => {
    
    const initialState = {
        notification: null,
        ringing: false,
        status: CONNECTION_STATUS.DISCONNECTED
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case TELECALL:
                return {...state, ringing: action.value};
            case MESSAGE:
                return {...state, notification: action.value};
            case ACCEPT_CALL:
            case END_CALL:
                return {...state, status: action.value};
            default:
                return initialState;  
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('Telemedicine init');
        if(connect && uid && did) {

            Connection.Create(connectUrl, uid, did);
            
            Connection.eventListner.on(SANAR_EVENT_TYPE.Connect, () => {
                console.log('Connected with Sanar');
            });
            
            Connection.eventListner.on(SANAR_EVENT_TYPE.Disconnect, () => {
                console.log('disconnected');
            });
            
            Connection.eventListner.on(SANAR_EVENT_TYPE.Telecall, (e) => {
                console.log(e);
                dispatch({type: MESSAGE, value: e});
                dispatch({type: TELECALL, value: true});
            });

            Connection.eventListner.on(SANAR_EVENT_TYPE.Message, (e) => {
                console.log('incoming message ', e);
                dispatch({type: MESSAGE, value: e});
            });
            
            Connection.eventListner.on(SANAR_EVENT_TYPE.ConnectError, () => {
                console.log('Connect error');
            });

        } else {
            console.log(`Connection validation warning ${connect} ${uid} ${did}`);
        }

    },[connect]);

    const open = () => {
        console.log('open');
    }

    const cancel = () => {
        console.log('cancel');
    }
    
    const onDecline = () => {
        const token = "c8NQD9ugZ72FV1dRdFcUypLzhjg7jS4Oymvur33xgo8ids+Lcw5uQWBDDibftTVogW1eomAvgGx3ubHJdh+mwSki19XjFulN9jZcyEWAUSqr6CWmi+JUQZR7i0tfvzpNBrsy6Opk0u49hCx//GQHoxcm9JHp5ecpy6dpovMK2IyM+Fy9XPirm6o/OGXZjaGRQiMfNX7mJWVOFevEeq8OwyTqtwEgmjHgpcqdHgTRqAazKjm6AwT7KQN82cDe5XCEtOaAvPa9Ii61wpeF+UPdfUUsi0kxpq/3s+lFcHOAzljFNvnTkx6o5FVn/U7Kl8wjIueMKV9xu5s0h2x7Bx7DW+ztWQ7bDLyHc6X5b7fRtNG3ZaDMD0PqaKUjBhPHtiFqbYe5s2hyfw90+1NsRSHvRg==";
        Connection.eventListner.emit(REJECT_CALL, JSON.stringify({ 
            did,
            headerToken: token,
            dsid: state.notification?.sid,
            roomName: state.notification?.roomName
        }));
        dispatch({type: MESSAGE, value: null});
        dispatch({type: TELECALL, value: false});
    }

    const onAccept = () => {
        const token = "c8NQD9ugZ72FV1dRdFcUypLzhjg7jS4Oymvur33xgo8ids+Lcw5uQWBDDibftTVogW1eomAvgGx3ubHJdh+mwSki19XjFulN9jZcyEWAUSqr6CWmi+JUQZR7i0tfvzpNBrsy6Opk0u49hCx//GQHoxcm9JHp5ecpy6dpovMK2IyM+Fy9XPirm6o/OGXZjaGRQiMfNX7mJWVOFevEeq8OwyTqtwEgmjHgpcqdHgTRqAazKjm6AwT7KQN82cDe5XCEtOaAvPa9Ii61wpeF+UPdfUUsi0kxpq/3s+lFcHOAzljFNvnTkx6o5FVn/U7Kl8wjIueMKV9xu5s0h2x7Bx7DW+ztWQ7bDLyHc6X5b7fRtNG3ZaDMD0PqaKUjBhPHtiFqbYe5s2hyfw90+1NsRSHvRg==";
        dispatch({type: TELECALL, value: false});
        dispatch({type: ACCEPT_CALL, value: CONNECTION_STATUS.CONNECTED});
        Connection.eventListner.emit(ACCEPT_CALL, JSON.stringify({ 
            did,
            headerToken: token,
            dsid: state.notification?.sid,
            roomName: state.notification?.roomName
        }));
    }

    const onEnd = () => {
        const token = "c8NQD9ugZ72FV1dRdFcUypLzhjg7jS4Oymvur33xgo8ids+Lcw5uQWBDDibftTVogW1eomAvgGx3ubHJdh+mwSki19XjFulN9jZcyEWAUSqr6CWmi+JUQZR7i0tfvzpNBrsy6Opk0u49hCx//GQHoxcm9JHp5ecpy6dpovMK2IyM+Fy9XPirm6o/OGXZjaGRQiMfNX7mJWVOFevEeq8OwyTqtwEgmjHgpcqdHgTRqAazKjm6AwT7KQN82cDe5XCEtOaAvPa9Ii61wpeF+UPdfUUsi0kxpq/3s+lFcHOAzljFNvnTkx6o5FVn/U7Kl8wjIueMKV9xu5s0h2x7Bx7DW+ztWQ7bDLyHc6X5b7fRtNG3ZaDMD0PqaKUjBhPHtiFqbYe5s2hyfw90+1NsRSHvRg==";
        Connection.eventListner.emit(REJECT_CALL, JSON.stringify({ 
            did,
            headerToken: token,
            dsid: state.notification?.sid,
            roomName: state.notification?.roomName
        }));
        dispatch({type: END_CALL, value: CONNECTION_STATUS.DISCONNECTED});
    }

    return (
        <>
            {/* booking flow section */}
            {bookingView && <Telemedicine url={sanarUrl} />}
            {/* telemedicine */}
            {
                state.ringing &&
                    <Ringer 
                        onAccept={onAccept}
                        onDecline={onDecline} />
            }
            {
                state.status == CONNECTION_STATUS.CONNECTED &&
                    <RtcView
                        notification={state.notification}
                        onEnd={onEnd} />
            }
        </>
    );
};

export default SanarTelemedicine;
export { Telemedicine as TelemedicineView };

export {
    Connection,
    SANAR_EVENT_TYPE,
    Ringer
};

const styles = StyleSheet.create({
    notification: {
        position: 'absolute',
        top: 100,
        bottom:0,
        left: 100,
        right: 0,
        zIndex:999,
        width: 200,
        height:200,
        backgroundColor: '#cccccc',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        padding: 10,
        borderWidth:1,
        borderColor:'#000000',
        margin:5
    }
});