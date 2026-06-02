export interface Usertype {
    _id: string;
    name: string;
    email: string;
    role: "client" | "freelancer";
}