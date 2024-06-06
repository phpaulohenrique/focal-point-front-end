import TrashIcon from '@/assets/trash.svg'
import Image from 'next/image'
import styles from './delete-task-dialog.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import Button from './button'
import { useState } from 'react'

import { Task } from '@/models/task'
import { deleteTask } from '@/api/delete-task'
import { toast } from 'sonner'

interface AddTaskDialogProps {
    onRemoveTaskFromList: (task: Task) => void
    selectedTask: Task
}

export function DeleteTaskDialog({ onRemoveTaskFromList, selectedTask }: AddTaskDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleDeleteTask = async () => {
        setIsLoading(true)
        const resp = await deleteTask(selectedTask)
        setIsLoading(false)

        // console.log(resp)
        if (resp === null) {
            toast.error('Ops, ocorreu um erro ao deletar a tarefa.')
            return
        }

        toast.success('Tarefa deletada com sucesso!')
        onRemoveTaskFromList(selectedTask)
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className={styles.btnDeleteTask} title="Excluir tarefa">
                    <Image src={TrashIcon} alt="" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.dialogOverlay} />
                <Dialog.Content className={styles.dialogContent}>
                    <Dialog.Title className={styles.dialogTitle}>Deletar tarefa</Dialog.Title>

                    <p className={styles.description}>
                        Tem certeza que você deseja deletar essa tarefa?
                    </p>

                    <div className={styles.containerAction}>
                        <Dialog.Close asChild>
                            <Button type="button" title="Cancelar" variant="secondary" />
                        </Dialog.Close>

                        <Button
                            title="Deletar"
                            onClick={() => handleDeleteTask()}
                            disabled={isLoading}
                            variant="destructive"
                        />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
