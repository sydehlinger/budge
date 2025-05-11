import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTransactionsByMonth } from '../../../services/api';
import { Transaction } from '../../../types/Transaction';

export function OverviewTable() {
    const [monthlyTransactions, setMonthlyTransactions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    //need to filter down to each category
    const mapTransactions = (transactions: Transaction[]) => {
        const map = new Map();
        console.log('transactions', transactions)
        transactions.map(transaction => {
            //by category, add up the amounts
            const category = transaction.category
            const amount = transaction.amount

            const curAmount = map.get(category) ?? 0
            console.log('category', category)
            console.log('curAmount', curAmount)
            console.log('amount', amount)

            const newAmount = curAmount + transaction.amount

            map.set(transaction.category, newAmount)
            console.log('map', map)
        });
        return map
    }

    const generateTableRows = () => {
        console.log('monthly', monthlyTransactions)
        return monthlyTransactions.map((transactionsForMonth, index) => {
            //create map for month
            console.log('transactions for month', transactionsForMonth)
            const amountsForCateogry = mapTransactions(transactionsForMonth.transactions)
            console.log('amounts for category', amountsForCateogry)
            // if no value display 0.00
            return (
                <TableRow key={index}>
                    <TableCell>{transactionsForMonth.date}</TableCell>
                    <TableCell>{amountsForCateogry.get('Recurring')}</TableCell>
                    <TableCell>{amountsForCateogry.get('Insurance')}</TableCell>
                    <TableCell>{amountsForCateogry.get('Utilities')}</TableCell>
                    <TableCell>{amountsForCateogry.get('Misc.')}</TableCell>
                    <TableCell>0</TableCell>
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
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generateTableRows()}
                            <TableRow>
                                <TableCell>Test</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>}

        </>
    )
}