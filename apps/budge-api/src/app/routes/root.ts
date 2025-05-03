import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'


export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient()

  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.get('/transactions', async function (req, res) {
    //call to get all transactions from database
    console.log('get all transactions')
    try {
      const transactions = await prisma.transaction.findMany()
      return transactions
    } catch (err) {
      console.log('error', err)
      return err
    }
  })
}
