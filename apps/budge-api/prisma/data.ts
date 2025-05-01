export const getSeedData = async () => {
  const transactionData = [
    {
      id: 1,
      date: new Date(),
      description: 'Test description',
      amount: 12.00,
      category: 'Misc.'
    }
  ]

  return {
    transactionData
  }
}
