// enums
export enum SANAR_EVENT_TYPE {
    Connect='connect',
    Disconnect= 'disconnect',
    Telecall= 'VIDEO_CALL',
    Message = 'INCOMING_MESSAGE',
    ConnectError = 'connect_error',
}

export enum CONNECTION_STATUS {
    CONNECTED,
    RINGING,
    DISCONNECTED,
}

// types
export type SanarTelemedicine = {
    uniqueId: string | number,
    uid: string | number,
    url: string
}
