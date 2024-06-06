import { api } from '@/lib/axios'
import { Task } from '@/models/task'

export const updateTask: (task: Task) => Promise<Task | null> = async (task) => {
    try {
        const response = await api.put<Task>(`task/${task.id}`, task)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}
