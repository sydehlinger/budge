import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTransactionsByMonth } from '../../../services/api';
import { Transaction } from '../../../types/Transaction';

export function OverviewTable() {
    const [monthlyTransactions, setMonthlyTransactions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const mapTransactions = (transactions: Transaction[]) => {
        const map = new Map();
        transactions.map(transaction => {
            const curAmount = map.get(transaction.category) ?? 0
            const newAmount = curAmount + transaction.amount

            map.set(transaction.category, newAmount)
            console.log('map', map)
        });
        return map
    }

    const generateTableRows = () => {
        console.log('monthly', monthlyTransactions)
        return monthlyTransactions.map((transactionsForMonth, index) => {
            const amountsForCateogry = mapTransactions(transactionsForMonth.transactions)
            return (
                <TableRow key={index}>
                    <TableCell>{transactionsForMonth.date}</TableCell>
                    <TableCell>{amountsForCateogry.get('Recurring') ?? 0}</TableCell>
                    <TableCell>{amountsForCateogry.get('Insurance') ?? 0}</TableCell>
                    <TableCell>{amountsForCateogry.get('Utilities') ?? 0}</TableCell>
                    <TableCell>{amountsForCateogry.get('Misc.') ?? 0}</TableCell>
                </TableRow>
            )
        })
    }

    useEffect(() => {
        fetchTransactionsByMonth().then(transactions => {
            setMonthlyTransactions(transactions)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Month</TableCell>
                                <TableCell>Recurring</TableCell>
                                <TableCell>Insurance</TableCell>
                                <TableCell>Utilities</TableCell>
                                <TableCell>Misc.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generateTableRows()}
                        </TableBody>
                    </Table>
                </TableContainer>}

        </>
    )
}