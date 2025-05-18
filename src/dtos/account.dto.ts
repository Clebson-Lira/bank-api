export interface DepositDTO {
  userId: number;
  amount: number;
}
export interface WithdrawDTO {
  userId: number;
  amount: number;
}
export interface TransferDTO {
  userId: number;
  targetAccountNumber: string;
  targetAgency: string;
  amount: number;
}