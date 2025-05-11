import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Transaction } from '../types/Transaction';
import { fetchTransactions, fetchTransactionsByYear } from '../services/api';
import { TransactionsTable } from '../components/table/transactions/TransactionsTable';

export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [year, setYear] = useState('All')

    const handleChange = (year: string) => {
        console.log('fetch transactions for a given year..., application will first load with current year')
        //call set year from drop down
        if (year === 'All') {
            getTransactions()
            setYear('All')
        } else {
            fetchTransactionsByYear(year).then(data => {
                setTransactions(data)
                setYear(year)
            })
        }
    }

    const getTransactions = () => {
        fetchTransactions().then(data => setTransactions(data))
    }

    useEffect(() => {
        // probably only care to get current year at first
        //page starts with all transactions, drop down can then change the page to transactions for a year
        // getTransactions()
        const currentYear = new Date().getFullYear().toString()
        fetchTransactionsByYear(currentYear).then(data => {
            setTransactions(data)
            setYear(currentYear)
        })
    }, [])

    return (
        <>
            <Header title={`Transactions - ${year}`} />
            <Grid container sx={{ pb: 2 }}>
                <Grid size={10}>
                    <Button variant='contained' href='/add-transactions'>+ Add Transaction</Button>
                </Grid>
                <Grid size={2}>
                    <FormControl fullWidth>
                        <InputLabel>Year</InputLabel>
                        {/* populate drop down with years that are in the database */}
                        <Select
                            label='Year'
                            value={year}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            <MenuItem value={'2025'}>2025</MenuItem>
                            <MenuItem value={'2024'}>2024</MenuItem>
                            <MenuItem value={'2023'}>2023</MenuItem>
                            <MenuItem value={'All'}>All</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TransactionsTable
                transactions={transactions}
                fetchData={getTransactions}
            />
        </>
    )
}