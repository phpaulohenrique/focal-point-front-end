import React, { forwardRef } from 'react'
import styles from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive'
    title: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const className = styles[props.variant || 'primary']
    return (
        <button ref={ref} id={styles.buttonBase} className={className} {...props}>
            {props.title}
        </button>
    )
})

Button.displayName = 'Button'
export default Button
