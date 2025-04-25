import { AppBar, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <NavLink to='/'>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} >
                        Budge
                    </Typography>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}