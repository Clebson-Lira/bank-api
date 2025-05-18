export interface TransactionPeriodDTO {
  startDate: string;
  endDate: string;
}
export interface TransactionDTO {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: Date;
  updatedAt: Date;
}