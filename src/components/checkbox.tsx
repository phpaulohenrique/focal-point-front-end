import React from 'react'
import styles from './checkbox.module.css'
import * as Checkbox from '@radix-ui/react-checkbox'
import CheckIcon from '@/assets/check.svg'
import Image from 'next/image'

import { CheckboxProps } from '@radix-ui/react-checkbox'

export function CustomCheckbox(props: CheckboxProps) {
    const className = styles[props.defaultChecked ? 'checkboxRootChecked' : 'checkboxRoot']

    return (
        <Checkbox.Checkbox onCheckedChange={() => props.onClick}>
            <Checkbox.Root className={className} {...props} id="c1">
                <Checkbox.Indicator className={styles.checkboxIndicator}>
                    <Image src={CheckIcon} alt="Tarefa finalizada" />
                </Checkbox.Indicator>
            </Checkbox.Root>
        </Checkbox.Checkbox>
    )
}
