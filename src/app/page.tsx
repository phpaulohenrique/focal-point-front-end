'use client'
import styles from './page.module.css'
import { Header } from '@/components/header'
import { useEffect, useState } from 'react'

import { Task } from '@/models/task'
import { updateTask } from '@/api/update-task'
import { AddTaskDialog } from '@/components/add-task-dialog'
import { DeleteTaskDialog } from '@/components/delete-task-dialog'
import { CustomCheckbox } from '@/components/checkbox'
import { toast } from 'sonner'
import { api } from '@/lib/apiClient'

export default function Home() {
    const [tasks, setTasks] = useState<Array<Task>>([])
    const finishedTasks = tasks.filter((task) => task.completed === true)
    const pendingTasks = tasks.filter((task) => task.completed === false)

    const getTasks = async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 3000)
        })
        try {
            const response = await api.get('/tasks', {
                // withCredentials: true,
            })
            setTasks(response.data)
        } catch (error) {
            toast.error('Ops, ocorreu um erro ao carregar as tarefas.')
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const handleUpdateTask = async (selectedTask: Task) => {
        const taskIndex = tasks.findIndex((task) => task.id === selectedTask.id)

        const updatedTask = await updateTask(selectedTask)
        if (updatedTask === null) {
            toast.error('Ops, ocorreu um erro ao atualizar a tarefa.')
            getTasks()
        }

        if (taskIndex > -1 && updatedTask) {
            const updatedTasks = [...tasks]

            updatedTasks[taskIndex] = updatedTask
            setTasks(updatedTasks)
        }
    }

    const onAddNewTaskToList = async (task: Task) => {
        setTasks(() => [...tasks, task])
    }

    const onRemoveTaskFromList = async (selectedTask: Task) => {
        const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id)
        setTasks(updatedTasks)
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.containerTasks}>
                        <strong className={styles.tasksTitle}>Suas tarefas de hoje</strong>

                        <ul className={styles.taskList}>
                            {pendingTasks.map((task) => (
                                <li className={styles.taskItem} key={task.id}>
                                    <div>
                                        <CustomCheckbox
                                            id={`task-${task.id}`}
                                            key={task.id}
                                            name="tarefa"
                                            onClick={() =>
                                                handleUpdateTask({ ...task, completed: true })
                                            }
                                        />
                                        <label htmlFor={`task-${task.id}`}>{task.title}</label>
                                    </div>
                                    <DeleteTaskDialog
                                        onRemoveTaskFromList={onRemoveTaskFromList}
                                        selectedTask={task}
                                        key={task.id}
                                    />
                                </li>
                            ))}

                            {pendingTasks.length === 0 && (
                                <span className={styles.message}>Nenhuma tarefa pendente</span>
                            )}
                        </ul>

                        <strong className={styles.tasksTitle}>Tarefas finalizadas</strong>

                        <ul className={styles.taskList}>
                            {finishedTasks.map((task) => (
                                <li className={styles.taskItem} key={task.id}>
                                    <div>
                                        <CustomCheckbox
                                            key={task.id}
                                            defaultChecked
                                            id={`task-${task.id}`}
                                            name="tarefa"
                                            onClick={() =>
                                                handleUpdateTask({ ...task, completed: false })
                                            }
                                        />
                                        <label
                                            className={styles.taskFinishedTitle}
                                            title={task.title}
                                            htmlFor={`task-${task.id}`}
                                        >
                                            {task.title}
                                        </label>
                                    </div>

                                    <DeleteTaskDialog
                                        onRemoveTaskFromList={onRemoveTaskFromList}
                                        selectedTask={task}
                                        key={task.id}
                                    />
                                </li>
                            ))}

                            {finishedTasks.length === 0 && (
                                <span className={styles.message}>Nenhuma tarefa finalizada</span>
                            )}
                        </ul>
                    </div>

                    <AddTaskDialog onAddNewTaskToList={onAddNewTaskToList} />
                </div>
            </main>
        </>
    )
}
