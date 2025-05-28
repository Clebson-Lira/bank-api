export interface DepositDTO {
  userId: string;
  amount: number;
}
export interface WithdrawDTO {
  userId: string;
  amount: number;
}
export interface TransferDTO {
  userId: string;
  targetAccountNumber: string;
  targetAgency: string;
  amount: number;
}