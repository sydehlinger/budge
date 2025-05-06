import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export function OverviewTable() {
    return (
        <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Recurring</TableCell>
                    <TableCell>Insurance</TableCell>
                    <TableCell>Utilities</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Subscriptions</TableCell>
                    <TableCell>Groceries</TableCell>
                    <TableCell>Eating Out</TableCell>
                    <TableCell>Gas</TableCell>
                    <TableCell>Cats</TableCell>
                    <TableCell>Fun</TableCell>
                    <TableCell>Other</TableCell>
                    <TableCell>Deposits</TableCell>
                    <TableCell>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Test</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    )
}