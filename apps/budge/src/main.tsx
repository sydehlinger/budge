import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './app/app';
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './app/redux/slices/transactionsSlice'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    transactions: transactionsReducer
  }
})

export type AppDispatch = typeof store.dispatch;

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
