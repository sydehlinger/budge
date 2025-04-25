import { Button } from '@mui/material';
import { Header } from '../components/Header';

export function Transactions() {
    return (
        <>
            <Header title='Transaction page'/>
            <Button href='/add-transactions'>+ Add Transaction</Button>
        </>
    )
}