import { Transaction } from '../types/Transaction';

export const getTransactions = async () => {
  return await fetch('http://localhost:8080/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const deleteTransaction = async (id: any) => {
  return await fetch(`http://localhost:8080/transactions/delete/${id}`, {
    method: 'POST'
  });
}

export const updateTransaction = async (data: Transaction) => {
  return await fetch(`http://localhost:8080/transactions/update/${data.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}


export const fetchData = async () => {
  try {
    const response = await getTransactions();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Handle the data received from the API
    console.log(data);
    return data
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};


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

export const updateData = async (data: Transaction) => {
  try {
    const transaction = {id: data.id, date: undefined, desription: data.description, amount: undefined, category: undefined}
    
    const response = await updateTransaction(data);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response.status);
  } catch (error) {
    console.error('There was an error updating the data:', error);
  }
}