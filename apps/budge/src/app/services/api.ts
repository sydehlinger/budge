import { Transaction } from '../types/Transaction';

const getTransactions = async () => {
  return await fetch('http://localhost:8080/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const fetchTransactions = async () => {
  try {
    const response = await getTransactions();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json()
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};


const getTransactionsByMonth = async () => {
  return await fetch('http://localhost:8080/transactions/overview', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const fetchTransactionsByMonth = async () => {
  try {
    const response = await getTransactionsByMonth();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json()
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};


const getTransactionsByYear = async (year: string) => {
  return await fetch(`http://localhost:8080/transactions/${year}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const fetchTransactionsByYear = async (year: string) => {
  try {
    const response = await getTransactionsByYear(year);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json()
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};

const deleteTransaction = async (id: any) => {
  return await fetch(`http://localhost:8080/transactions/delete/${id}`, {
    method: 'POST'
  });
}

export const deleteData = async (id: number) => {
  try {
    const response = await deleteTransaction(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.status);
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};

const updateTransaction = async (data: Transaction) => {
  return await fetch(`http://localhost:8080/transactions/update/${data.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}

export const updateData = async (data: Transaction) => {
  try {    
    const response = await updateTransaction(data);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.status);
  } catch (error) {
    console.error('There was an error updating the data:', error);
  }
}