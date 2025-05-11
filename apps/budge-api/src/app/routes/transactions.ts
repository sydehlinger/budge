import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client'
import { endOfMonth, format } from 'date-fns'

export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient()

  fastify.get('/transactions', async function (req: FastifyRequest, res: FastifyReply) {
    console.log('get all transactions')
    try {
      const transactions = await prisma.transaction.findMany({ orderBy: [{ date: 'asc' }] })
      return transactions
    } catch (err) {
      console.log('error', err)
      throw new Error()
    }
  })

  fastify.get('/transactions/overview', async function (req: FastifyRequest, res: FastifyReply) {
    console.log('get transactions by month/year')
    const list: any[] = [];
    try {
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date(currentYear, 11, 31);

      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        await prisma.transaction.findMany({
          where: {
            date: {
              gte: currentDate,
              lte: endOfMonth(currentDate)
            }
          }
        }).then((transactions: any) => {
          list.push({ date: format(currentDate, 'MM/yyyy'), transactions })
        })
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      console.log('list', list)
      return list;
    } catch (err) {
      console.log('error', err)
      throw new Error()
    }
  })

  fastify.get('/transactions/:year', async function (req: FastifyRequest, res: FastifyReply) {
    console.log('get transactions for given year')
    const { year }: any = req.params;
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);

    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: [{ date: 'asc' }],
        where: {
          date: {
            gte: startDate,
            lte: endDate
          }
        }
      })
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
    const { id }: any = req.params;
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
    const { id }: any = req.params;
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
