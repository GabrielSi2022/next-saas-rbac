import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import z from 'zod'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Obter perfil de usuario autenticado',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },

    async (request, reply) => {
      const { email } = request.body
      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      console.log('Token de recuperação de senha:', code)

      return reply.status(201).send()
    }
  )
}