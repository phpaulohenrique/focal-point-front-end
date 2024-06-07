import { api } from '@/lib/apiClient'
import { Task } from '@/models/task'

export const deleteTask: (task: Task) => Promise<undefined | null> = async (task) => {
    try {
        await api.delete(`task/${task.id}`)
    } catch (error) {
        console.error(error)

        return null
    }
}
