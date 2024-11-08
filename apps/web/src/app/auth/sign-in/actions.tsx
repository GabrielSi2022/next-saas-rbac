'use server'

import { SignInWithPassword } from '@/http/sign-in-with-password'

export async function SignInWithEmailAndPassword(
  previousState: unknown,
  data: FormData
) {
  console.log(previousState)
  const { email, password } = Object.fromEntries(data)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const result = await SignInWithPassword({
    email: String(email),
    password: String(password),
  })

  console.log(result)

  return 'Logado!'
}
