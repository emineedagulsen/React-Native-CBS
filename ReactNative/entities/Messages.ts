import { User } from "../entities/User";

export class Messages {
    constructor(public title: string, public user: User, public id?: string) { }
}