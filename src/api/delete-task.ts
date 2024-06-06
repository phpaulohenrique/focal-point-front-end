import { api } from '@/lib/axios'
import { Task } from '@/models/task'

export const deleteTask: (task: Task) => Promise<undefined | null> = async (task) => {
    try {
        await api.delete(`task/${task.id}`)
    } catch (error) {
        console.error('Error deleting task:', error)
        return null
    }
}
