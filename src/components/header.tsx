'use client'
import styles from './header.module.css'
import Image from 'next/image'

import Logo from '@/assets/logo.svg'

export function Header() {
    let userName = ''
    if (typeof window !== 'undefined') {
        userName = localStorage.getItem('userName') ?? ''
    }

    function formatDate(date: Date) {
        let formattedDate = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        // remove o  "-feira"
        formattedDate = formattedDate.replace(/-feira/g, '')
        // deixa  a primeira letra em uppercase
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

        return formattedDate
    }

    const todayDate = new Date()
    const formattedDate = formatDate(todayDate)
    return (
        <header className={styles.header}>
            <div>
                <Image src={Logo} alt="Focal Point" width={150} height={50} />
                <span className={styles.welcomeMessage}>Bem-vindo de volta, {userName}</span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
        </header>
    )
}
