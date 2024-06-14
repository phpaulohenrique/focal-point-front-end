import styles from './add-task-dialog.module.css'

import * as Dialog from '@radix-ui/react-dialog'
import Button from './button'
import { FormEvent, useState } from 'react'
import { createTask } from '@/api/create-task'
import { Task } from '@/models/task'
import { toast } from 'sonner'

interface AddTaskDialogProps {
    onAddNewTaskToList: (task: Task) => void
}

export function AddTaskDialog({ onAddNewTaskToList }: AddTaskDialogProps) {
    const [taskTitle, setTaskTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleAddNewTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!taskTitle) {
            toast.error('Preencha o nome da tarefa.')
            return
        }

        setIsLoading(true)
        const task = await createTask({
            completed: false,
            title: taskTitle,
        })
        setIsLoading(false)
        if (task == null) {
            toast.error('Ops, ocorreu um erro ao cadastrar a tarefa.')
            return
        }
        toast.success('Tarefa cadastrada com sucesso!')

        setTaskTitle('')
        onAddNewTaskToList(task)
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button title="Adicionar nova tarefa" variant="primary" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.dialogOverlay} />
                <Dialog.Content className={styles.dialogContent}>
                    <Dialog.Title className={styles.dialogTitle}>Nova tarefa</Dialog.Title>

                    <form id="form" onSubmit={handleAddNewTask}>
                        <fieldset className={styles.fieldset}>
                            <label className={styles.label} htmlFor="task">
                                Título
                            </label>
                            <input
                                className={styles.input}
                                name="task"
                                id="task"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(() => e.target.value)}
                                placeholder="Digite"
                            />
                        </fieldset>
                    </form>

                    <div className={styles.containerAction}>
                        <Dialog.Close asChild>
                            <Button type="button" title="Cancelar" variant="secondary" />
                        </Dialog.Close>

                        <Button title="Adicionar" disabled={isLoading} form="form" type="submit" />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
