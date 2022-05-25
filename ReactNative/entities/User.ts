export class  User {
    
    email: string;
    password: string;
    displayname?: string;
    photoUrl?: string

    constructor(email: string,password:string, displayname?: string, photoUrl?: string) {
        this.email = email;
        this.password = password;
        this.displayname = displayname;
        this.photoUrl = photoUrl;
    }
}