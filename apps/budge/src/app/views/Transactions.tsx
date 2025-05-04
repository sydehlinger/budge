import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Transaction } from '../types/Transaction';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTransaction, getTransactions } from '../services/api';

export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleDelete = (transactionId: number) => {
        console.log('delete', transactionId)
        deleteData(transactionId)
        fetchData()
    }

    const deleteData = async (id: number) => {
        try {
            const response = await deleteTransaction(id);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(response.status);
        } catch (error) {
            // Handle errors during the API call
            console.error('There was an error fetching the data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await getTransactions();

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
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction: Transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.date.toString()}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell><IconButton onClick={() => handleDelete(transaction.id)}><DeleteIcon /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}