//specify param
export class Chatroom {
    static timestamp(timestamp: any): [any, any] {
        throw new Error('Method not implemented.');
    }
    constructor(public user: string, public status: Status,
        public message: string, public timestamp: Date, public id?: string) { }
}

export enum Status {
    READ = "READ", UNREAD = "UNREAD"
}