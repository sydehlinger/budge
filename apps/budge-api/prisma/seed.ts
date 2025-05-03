import { PrismaClient } from '@prisma/client'

import { getSeedData } from './data'

const client = new PrismaClient()

const deleteAllRecords = async () => {
  await client.transaction.deleteMany();
  console.log('All records deleted')
}

const createAllRecords = async () => {
  const data = await getSeedData()
  console.log(data);
  try{
    await client.transaction.createMany({ data: data.transactionData});
  } catch (err) {
    console.log('create transaction failed', err);
  }
  console.log('All transactions created')
}

async function seed() {
  await deleteAllRecords()
  await createAllRecords()
}

seed()
  .then(async () => {
    await client.$disconnect()
    console.log('database disconnected')
    process.exit(0)
  })
  .catch(async e => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
