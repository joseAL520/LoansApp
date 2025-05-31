export interface Client {
  id: string;
  nit: number;
  fullName: string;
  email: string;
  loans: number;
  payDate?: string;
}