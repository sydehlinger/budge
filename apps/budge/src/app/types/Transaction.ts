import { Dayjs } from 'dayjs'

export type Transaction = {
    id: number
    description: string
    amount: string
    date: Dayjs
    category: string
}
