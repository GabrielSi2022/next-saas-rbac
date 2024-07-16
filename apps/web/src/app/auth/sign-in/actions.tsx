'use server'

export async function SignInWithEmailAndPassword(data: FormData) {
  console.log(Object.fromEntries(data))
}
