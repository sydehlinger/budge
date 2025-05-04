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