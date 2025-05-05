import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Transaction } from '../../types/Transaction';
import { TransactionTableRow } from './TransactionTableRow';

export function TransactionsTable(props: { transactions: Transaction[], fetchData: any }) {
    return (
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
                    {props.transactions.map((transaction: Transaction, index: number) => (
                        <TransactionTableRow
                            key={index}
                            transaction={transaction}
                            fetchTransactionData={props.fetchData}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}