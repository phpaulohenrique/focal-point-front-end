import styles from './header.module.css'
import Image from 'next/image'

import Logo from '@/assets/logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <div>
                <Image src={Logo} alt="Focal Point" width={150} />
                <span className={styles.welcomeMessage}>Bem-vindo de volta, Marcus</span>
                <span className={styles.date}>Segunda, 22 de dezembro de 2024</span>
            </div>
        </header>
    )
}
