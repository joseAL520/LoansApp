export interface User {
    id:       string;
    email:    string;
    password: string;
    fullName: string;
    Wallet:   Wallet;
    role:     string[];
}

export interface Wallet {
    capital:    number;
    totalLoans: number;
}
