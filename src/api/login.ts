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
            toast.error(error.response?.data.message)
        }
        return null
    }
}
