import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTransactionsByMonth } from '../../../services/api';

export function OverviewTable() {
    const [monthlyTransactions, setMonthlyTransactions] = useState<any[]>([])

    useEffect(() => {
        fetchTransactionsByMonth().then(transactions => setMonthlyTransactions(transactions))
    }, [])

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Recurring</TableCell>
                        <TableCell>Insurance</TableCell>
                        <TableCell>Utilities</TableCell>
                        <TableCell>Misc.</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {monthlyTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>idk</TableCell>
                        </TableRow>
                        ))}
                    <TableRow>
                        <TableCell>Test</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}