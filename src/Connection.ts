// @ts-ignore
import io from 'socket.io-client';

export interface SanarConnectionInterface {
    Create(
        uid: string, 
        uniqueId: string, 
        url: string
    ): void,
    Disconnect(): void,
}

class Connection implements SanarConnectionInterface {
    public eventListner: any;
    
    Create (url: string, uid: string | number, uniqueId: string | number) {
        this.eventListner = io(url, { query: `uid=${uid}&did=${uniqueId}` });
    };

    Disconnect () {
        this.eventListner.disconnect()
    }
};

export default new Connection();