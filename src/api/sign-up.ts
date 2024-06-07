import { api } from '@/lib/apiClient'
import axios from 'axios'
import { toast } from 'sonner'

type SignUp = {
    name: string
    email: string
    password: string
}

export const signUp: (signUp: SignUp) => Promise<undefined | null> = async (signUp) => {
    try {
        await api.post(`users`, signUp)
        toast.success('Conta cadastrada com sucesso, aguarde para ser redirecionado.')
    } catch (error) {
        console.error(error)
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
        return null
    }
}
