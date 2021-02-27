export interface Message {

    id:number;
    senderId: number;
    senderKnownAs: string;
    senderPhotoUrl: string
    recipientId: number;
    recipientKnonwAs: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
