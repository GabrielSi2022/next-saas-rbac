'use client'

import { Loader2 } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { SignInWithEmailAndPassword } from './actions'
import { useActionState } from 'react'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    SignInWithEmailAndPassword,
    null
  )
  return (
    <form action={formAction} className="space-y-4">
      <h1>{state}</h1>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input name="password" type="password" id="password" />

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Entrar com E-mail'
        )}
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Não possui uma conta? Cadastre aqui</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        Entrar com GitHub
      </Button>
    </form>
  )
}
