import { Button } from '@mui/material';

export function Home() {
    return (
        <>
            <p>This is the home/overview page</p>
            <Button href='/transactions'>Transactions</Button>
        </>
    );
}