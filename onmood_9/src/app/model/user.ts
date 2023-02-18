export class User {
    // public Id: number;
    // public name: string;
    // public pwd:string;
    // public email:string;
    public created_at!: string;
    public dob!: string;
    public email: string;
    public fname: string;
    public gender!: string;
    public id: number
    public lname!: string;
    public mobile!: string;
    public contact!: string;
    public modified_at!: string;
    public uuid!: string;
    
    constructor(Id:number, name: string, pwd:string, email:string) {
        this.id = Id;
        this.fname = name;
        this.email = email;
    }
}