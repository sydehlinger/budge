import { ReactNode } from 'react'
import { Navbar } from '../components/Navbar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Header } from '../components/Header';

interface Props {
    children: ReactNode
}
export function Layout({ children }: Props) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Navbar />
                {children}
            </LocalizationProvider>
        </>
    )
}