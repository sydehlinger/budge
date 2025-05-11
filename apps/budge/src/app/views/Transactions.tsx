import { Box, Button } from '@mui/material';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Transaction } from '../types/Transaction';
import { fetchTransactions} from '../services/api';
import { TransactionsTable } from '../components/table/transactions/TransactionsTable';

export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const getTransactions = () => {
        fetchTransactions().then(data => setTransactions(data))
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <>
            <Header title='Transactions' />
            <Box sx={{ pb: 2 }}>
                <Button variant='contained' href='/add-transactions'>+ Add Transaction</Button>
            </Box>
            <TransactionsTable
                transactions={transactions}
                fetchData={getTransactions}
            />
        </>
    )
}