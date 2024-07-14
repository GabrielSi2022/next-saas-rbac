import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { roleSchema } from '@saas/auth/src/roles'

export async function getPendingInvites(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/pending-invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get all user peding invites',

          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string(),
                  createdAt: z.date(),
                  role: roleSchema,
                  email: z.string().email(),
                  author: z
                    .object({
                      name: z.string().nullable(),
                      id: z.string().uuid(),
                      avatarUrl: z.string().url().nullable(),
                    })
                    .nullable(),
                })
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        const invites = await prisma.invite.findMany({
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            email: user.email,
          },
        })

        return {
          invites,
        }
      }
    )
}
