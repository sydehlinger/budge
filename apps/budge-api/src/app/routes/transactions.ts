import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client'


export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient()

  fastify.get('/transactions', async function (req: FastifyRequest, res: FastifyReply) {
    //call to get all transactions from database
    console.log('get all transactions')
    try {
      const transactions = await prisma.transaction.findMany()
      return transactions
    } catch (err) {
      console.log('error', err)
      throw new Error()
    }
  })

  fastify.post('/transactions', async function (req: FastifyRequest, res: FastifyReply) {
    console.log('post transaction', req.body)
    const body: any = req.body;
    try {
      await prisma.transaction.create({
        data: {
          date: new Date(body.date),
          description: body.description,
          amount: body.amount,
          category: body.category
        } as any
      })
    } catch (err) {
      console.log('error', err)
      throw new Error()
    }
  })

  fastify.post('/transactions/update/:id', async function (req: FastifyRequest, res: FastifyReply) {
    const {id}: any = req.params;
    const body: any = req.body;
    console.log(`update transaction id: ${id} ${body}`)
    try {
      await prisma.transaction.update({
        where: {
          id: parseInt(id)
        },
        data: {
          date: body.date ? new Date(body.date) : undefined,
          description: body.description || undefined,
          amount: body.amount || undefined,
          category: body.category || undefined
        } as any
      })
    } catch (err) {
      console.log('error', err)
      throw new Error()
    }
  })

  fastify.post('/transactions/delete/:id', async function (req: FastifyRequest, res: FastifyReply) {
      const {id}: any = req.params;
      console.log('delete transaction', id)
    try {
      await prisma.transaction.delete({
        where: {
            id: parseInt(id)
        }
      })
    } catch (err) {
      console.log('error', err)
      throw new Error()
    }
  })
}
