export interface UserForm {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: {
        street: string;
        mandal: string;
        state: string;
        country: string;
    };
}