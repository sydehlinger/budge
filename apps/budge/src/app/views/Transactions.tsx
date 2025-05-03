import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Transaction } from '../types/Transaction';

export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/transactions', {
                method: 'GET', // or 'POST', 'PUT', 'DELETE' etc.
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers your API requires
                },
                // If sending data with POST/PUT, add a body:
                // body: JSON.stringify({ key: 'value' }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Handle the data received from the API
            console.log(data);
            setTransactions(data);
        } catch (error) {
            // Handle errors during the API call
            console.error('There was an error fetching the data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Header title='Transaction page' />
            <Button href='/add-transactions'>+ Add Transaction</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction: Transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date.toString()}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}