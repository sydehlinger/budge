import Chance from 'chance';

export const getSeedData = async () => {
  const chance = new Chance();  

  const setAmount = () => {
    return chance.floating({fixed: 2, min: 0, max: 5000})
  }

  const setDate = () => {
    return chance.date()
  }

  const setDescription = () => {
    return chance.sentence({words: 3})
  }

  const setCategory = () => {
    return chance.pickone(['Recurring', 'Utilities', 'Misc.'])
  }

  const transactionData = [
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
