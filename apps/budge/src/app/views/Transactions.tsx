import { Box, Button } from '@mui/material';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Transaction } from '../types/Transaction';
import { getTransactions } from '../services/api';
import { TransactionsTable } from '../components/table/TransactionsTable';

export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchData = async () => {
        try {
            const response = await getTransactions();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setTransactions(data);
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Header title='Transactions' />
            <Box sx={{ pb: 2 }}>
                <Button variant='contained' href='/add-transactions'>+ Add Transaction</Button>
            </Box>
            <TransactionsTable
                transactions={transactions}
                fetchData={fetchData}
            />
        </>
    )
}