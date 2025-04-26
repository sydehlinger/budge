import { Button } from '@mui/material';
import { Header } from '../components/Header';

export function Home() {
    return (
        <>
            <Header title='Overview page'/>
            <Button href='/transactions'>Transactions</Button>
        </>
    );
}