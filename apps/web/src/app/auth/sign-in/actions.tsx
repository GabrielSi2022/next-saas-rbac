'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { z } from 'zod'

import { SignInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({ message: 'Por Favor use um e-mail valido' }),
  password: z.string().min(1, { message: 'Por favor use uma senha valida ' }),
})

export async function SignInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await SignInWithPassword({
      email,
      password,
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, //7 dias
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Erro Inesperado , tente novamente mais tarde',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
