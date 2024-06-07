'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Logo from '@/assets/logo.svg'
import { FormEvent, useState } from 'react'
import Button from '@/components/button'
import { login } from '@/api/login'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Todos os campos são obrigatórios.')
            return
        }

        const resp = await login({ email, password })

        if (resp === null) {
            return
        }
        router.push('/')
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Image src={Logo} alt="Focal Point" width={180} />
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={handleSignIn}>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="email">
                            E-mail
                        </label>
                        <input
                            className={styles.input}
                            name="email"
                            id="email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(() => e.target.value)}
                            placeholder="email@email.com"
                        />
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <label className={styles.label} htmlFor="password">
                            Senha
                        </label>
                        <input
                            className={styles.input}
                            name="password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(() => e.target.value)}
                            placeholder="*******"
                        />
                    </fieldset>

                    <Button
                        title="Entrar"
                        type="submit"
                        style={{ marginTop: '3.2rem', width: '100%' }}
                    />

                    <Link href="/sign-up">
                        <Button
                            title="Cadastre-se"
                            variant="secondary"
                            style={{ marginTop: '1.8rem', width: '100%' }}
                        />
                    </Link>
                </form>
            </div>
        </main>
    )
}
