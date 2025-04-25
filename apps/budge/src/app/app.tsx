import { Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';
import { Transactions } from './views/Transactions';
import { Container } from '@mui/material';
import { AddTransactions } from './views/AddTransactions';
import { Layout } from './views/Layout';

export function App() {
  return (
      <Layout>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/add-transactions' element={<AddTransactions />} />
          </Routes>
        </Container>
      </Layout>
  );
}

export default App;
