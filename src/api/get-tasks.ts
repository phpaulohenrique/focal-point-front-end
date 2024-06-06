import { api } from '@/lib/axios'
import { Task } from '@/models/task'

export const getTasks: () => Promise<Task[] | undefined> = async () => {
    try {
        const response = await api.get<Task[]>('tasks')
        return response.data
    } catch (error) {
        console.error('Error getting task:', error)
        // return null // Retornando undefined em caso de erro
    }
}
