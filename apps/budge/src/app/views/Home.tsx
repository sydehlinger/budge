import { Button } from '@mui/material';
import { Header } from '../components/Header';
import { OverviewTable } from '../components/table/overview/OverviewTable';

export function Home() {
    return (
        <>
            <Header title='Overview' />
            <OverviewTable/>
        </>
    );
}