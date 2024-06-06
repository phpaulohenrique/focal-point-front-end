import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter_Tight({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'FocalPoint | Gestão de tarefas do seu dia a dia',
    description: 'Uma aplicação moderna para você gerenciar suas tarefas!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <Toaster richColors />
            <body className={inter.className}>{children}</body>
        </html>
    )
}
