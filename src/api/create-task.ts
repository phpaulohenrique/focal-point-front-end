import { api } from '@/lib/axios'
import { Task } from '@/models/task'

type TaskCreateType = Omit<Task, 'id'>

export const createTask: (task: TaskCreateType) => Promise<Task | null> = async (task) => {
    try {
        const response = await api.post<Task>(`tasks`, task)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}
