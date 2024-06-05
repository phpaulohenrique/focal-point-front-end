import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter_Tight } from 'next/font/google'
import './globals.css'

const inter = Inter_Tight({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'FocalPoint',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
