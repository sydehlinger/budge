import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Header } from '../components/Header';
import { Transaction } from './AddTransactions';

function createData(
    date: string,
    recurring: number,
    utilities: number,
    deposits: number
) {
    return { date, recurring, utilities, deposits };
}

const rows = [
    createData('01/01/2025', 159, 6.0, 24),
    createData('02/01/2025', 237, 9.0, 37),
];

export function Transactions() {
    return (
        <>
            <Header title='Transaction page' />
            <Button href='/add-transactions'>+ Add Transaction</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Recurring</TableCell>
                            <TableCell>Utilities</TableCell>
                            <TableCell>Deposits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.date}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.recurring}</TableCell>
                                <TableCell align="right">{row.utilities}</TableCell>
                                <TableCell align="right">{row.deposits}</TableCell>
                            </TableRow>
                        ))}      
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}