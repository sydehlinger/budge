import { Dayjs } from 'dayjs'

export type Transaction = {
    description: string
    amount: string
    date: Dayjs
    category: string
}
