export interface Client {
  id: string;
  nit: number;
  fullName: string;
  email: string;
  loans: number;
  payDate?: string;
}

// export interface Admin {
//   email:    string;
//   password: string;
//   Wallet:   Wallet;
// }

// export interface Wallet {
//   capital:    number;
//   totalLoans: number;
// }