'use client'
import { api } from '@/lib/apiClient'

import axios from 'axios'
import { toast } from 'sonner'

type Login = {
    email: string
    password: string
}

export const login: (login: Login) => Promise<undefined | null> = async (login) => {
    try {
        const response = await api.post(`login`, login)

        localStorage.setItem('userName', response.data.name)
    } catch (error) {
        console.error(error)
        if (axios.isAxiosError(error)) {
            const msgError = error.response?.data.message ?? 'Erro ao conectar ao servidor.'
            toast.error(msgError)
        }
        return null
    }
}
