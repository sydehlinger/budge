import { Transaction } from '../views/AddTransactions'

export type TransactionAction = {
    type: string
    transaction: Transaction
  }