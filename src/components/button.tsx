import React, { ComponentProps } from 'react'
import styles from './button.module.css'

interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'primary' | 'secondary' | 'destructive'
    title: string
}

export function Button({ variant, title, ...rest }: ButtonProps) {
    const className = styles[variant || 'primary']
    return (
        <button id={styles.buttonBase} className={className} {...rest}>
            {title}
        </button>
    )
}
