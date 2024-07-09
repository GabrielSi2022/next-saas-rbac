import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { userSchema } from '@saas/auth/src/models/user'
import { organizationSchema } from '@saas/auth/src/models/organization'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { defineAbilityFor } from '@saas/auth'

import { createSlug } from '@/utils/create-slug'

export async function updateOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organization/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'update organization details',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().nullish(),
            shouldAttachUsersByDomain: z.boolean().optional(),
          }),
          params: z.object({
            slug: z.string(),
          }),

          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { name, domain, shouldAttachUsersByDomain } = request.body

        const authUser = userSchema.parse({
          id: userId,
          role: membership.role,
        })

        const authOrganization = organizationSchema.parse(organization)

        const { cannot } = defineAbilityFor(authUser)

        if (cannot('update', authOrganization)) {
          throw new BadRequestError(
            'You re not allowed to update this organization'
          )
        }

        if (domain) {
          const organizationByDomain = await prisma.organization.findFirst({
            where: {
              domain,
              id: {
                not: organization.id,
              },
            },
          })

          if (organizationByDomain) {
            throw new BadRequestError(
              'Another organization with same domain already exists.'
            )
          }
        }

        await prisma.organization.update({
          where: {
            id: organization.id,
          },
          data: {
            name,
            // slug: createSlug(name),
            domain,
            shouldAttachUsersByDomain,
          },
        })

        return reply.status(204).send()
      }
    )
}
