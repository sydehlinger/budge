import Chance from 'chance';

export const getSeedData = async () => {
  const chance = new Chance();  

  const setAmount = () => {
    return chance.floating({fixed: 2, min: 0, max: 5000})
  }

  const pickYear = () => {
    return chance.pickone([2022, 2023, 2024])
  }

  const setDate = (year?: number) => {
    return chance.date({year: year ?? pickYear()})
  }

  const setDescription = () => {
    return chance.sentence({words: 3})
  }

  const setCategory = () => {
    return chance.pickone(['Recurring', 'Utilities', 'Misc.'])
  }

  const transactionData = [
    {
      date: setDate(2025),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(2025),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(2025),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(2025),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(2025),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(2025),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    },
    {
      date: setDate(),
      description: setDescription(),
      amount: setAmount(),
      category: setCategory()
    }
  ]

  return {
    transactionData
  }
}
