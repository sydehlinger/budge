import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Container>
                    <Grid container justifyContent='space-between'>
                        <Grid>
                            <NavLink to='/'>
                                <Typography variant='h6' >
                                    Budge
                                </Typography>
                            </NavLink>
                        </Grid>
                        <Grid>
                            <Button href='/transactions' sx={{color: 'white'}}>
                                Transactions
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
}