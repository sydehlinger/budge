import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        transactionAdded(state, action) {
            const { date } = action.payload
            state.push({
                date
            })
        }
    }
})

export const { transactionAdded } = transactionsSlice.actions
export default transactionsSlice.reducer