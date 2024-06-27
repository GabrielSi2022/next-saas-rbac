import { z } from 'zod'

export const inviteSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('get'),
    z.literal('delete'),
  ]),
  z.literal('invite'),
])

export type inviteSubject = z.infer<typeof inviteSubject>
